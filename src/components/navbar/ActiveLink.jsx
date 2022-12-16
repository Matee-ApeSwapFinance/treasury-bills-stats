import { Link, useRoute } from 'wouter'

const ActiveLink = props => {
  const [isActive] = useRoute(props.to);
  return (
    <Link to={props.to}>
      <div className={isActive ? "navOption active" : "navOption"}>
        {props.option}
      </div>
    </Link>
  );
}

export default ActiveLink