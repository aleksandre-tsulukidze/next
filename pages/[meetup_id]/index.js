/* eslint-disable @next/next/no-img-element */
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/dist/next-server/lib/head';
import classes from '../../styles/meetupDetails.module.css';

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>

      <section className={classes.detail}>
        <img src={props.meetupData.image} alt="A first Meetup" />
        <h1>{props.meetupData.title}</h1>
        <address>{props.meetupData.address}</address>
        <p>{props.meetupData.description}</p>
      </section>
    </>
  );
};

export const getStaticPaths = async () => {
  const mongoDbCredentials = '';

  const client = await MongoClient.connect(mongoDbCredentials);

  const db = client.db();
  const meetupsCollections = db.collection('meetups');

  const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetup_id: meetup._id.toString() },
    })),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetup_id;

  const mongoDbCredentials =
    'mongodb+srv://alexander:200017alex@cluster0.t0fmx.mongodb.net/meetups?retryWrites=true&w=majority';

  const client = await MongoClient.connect(mongoDbCredentials);

  const db = client.db();
  const meetupsCollections = db.collection('meetups');

  const selectedMeetup = await meetupsCollections.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
};

export default MeetupDetails;
