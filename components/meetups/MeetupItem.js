/* eslint-disable @next/next/no-img-element */
import Card from '../ui/Card';
import { useRouter } from 'next/dist/client/router';
import classes from './MeetupItem.module.css';

function MeetupItem(props) {
  const router = useRouter();

  // change pages without using Link
  const showDetailsHandler = () => {
    router.push(`/${props.id}`);
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
