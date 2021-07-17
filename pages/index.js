import MeetupList from '../components/meetups/MeetupList';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse for actively searched meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

// does data fetching on server and returns populated static pages
// this code never reaches client
export const getStaticProps = async () => {
  // in the end you MUST return an object called props
  // this function fires only on deploy it means data added after deploy will not be shown
  // to change that add *revalidate* paramter it takes is number of seconds

  const mongoDbCredentials = '';

  const client = await MongoClient.connect(mongoDbCredentials);

  const db = client.db();
  const meetupsCollections = db.collection('meetups');

  const meetups = await meetupsCollections.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

// // use this function when data must be changed really frequently
// // this code never reaches client
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from API

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export default HomePage;
