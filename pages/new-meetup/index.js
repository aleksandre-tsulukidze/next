import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/dist/next-server/lib/head';

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    console.log(result);
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>Add New Meetups</title>
        <meta name="description" content="Create new and amazing meetups" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
