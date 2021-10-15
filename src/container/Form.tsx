import { useCallback, FormEvent, useEffect, useState } from 'react';

import { Results, SwitchAnswer, Section } from '../models';
import { answerConverter, answerCounter } from '../utils';
import { fetchChecks, submitCheckResults } from '../api/api';
import Switch from '../components/Switch/Switch';
import Button from '../components/Button/Button';
import classes from './form.module.css';

const Home: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [results, setResults] = useState<Results>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState(false);

  const { yesCounter, noCounter } = answerCounter(results);
  const submitMode = !(yesCounter === sections.length || noCounter > 0);

  const responseHandler = useCallback((res: Section[]) => {
    const sortedSections = res.sort((a, b) => a.priority - b.priority);
    setSections(sortedSections);
  }, []);

  const fetchApi = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchChecks();
      responseHandler(response);
      setLoading(false);
    } catch (error) {
      setError('Something went wrong.');
      setLoading(false);
    }
  }, [responseHandler]);

  useEffect(() => {
    if (loading) fetchApi();
  }, [fetchApi, loading]);

  const onChange = (id: string, value: SwitchAnswer) => {
    setError('');
    const newAnswers = { ...results, [id]: value };
    const sectionIndex = sections.findIndex((item) => item.id === id);

    for (let i = sectionIndex + 1; i < sections.length; i++) {
      newAnswers[sections[i].id] = undefined;
    }
    setResults(newAnswers);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsedAnswers = answerConverter(results);
    setSubmitLoading(true);
    setError('');
    try {
      await submitCheckResults(parsedAnswers);
      setIsSubmitted(true);
      setSubmitLoading(false);
    } catch (error) {
      setSubmitLoading(false);
      setError('Something went wrong.');
    }
  };

  const handleReset = () => {
    setResults({});
    setIsSubmitted(false);
  };

  if (loading) {
    return <div className={classes.loader}></div>;
  }
  if (error) {
    return (
      <div className={classes.error}>
        <p>{error}</p>
        <Button onClick={fetchApi}>Try Again</Button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className={classes.successful}>
        <p>Your form has been submitted.</p>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {sections.map((section, index) => {
        const { id, description } = section;
        const prevSection =
          index !== 0 ? results[sections[index - 1].id] : SwitchAnswer.YES;
        const disabled = prevSection !== SwitchAnswer.YES;
        const value = results[id];
        return (
          <Switch
            value={value}
            onChange={onChange}
            disabled={disabled}
            description={description}
            id={id}
            key={id}
          />
        );
      })}
      <div className={classes.form}>
        <Button type='submit' loading={submitLoading} disabled={submitMode}>
          submit
        </Button>
      </div>
    </form>
  );
};

export default Home;
