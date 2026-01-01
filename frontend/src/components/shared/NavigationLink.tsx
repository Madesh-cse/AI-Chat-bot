import { Link } from "react-router-dom"

// Cutomize Navigation Link

type Props = {
    to: string,
    bg: string,
    text: string,
    textcolor:string,
    OnClick?: ()=> Promise<void>
}

function NavigationLink(props: Props) {
  return (
    <Link onClick={props.OnClick}  className="nav-link" to={props.to} style={{background: props.bg, color: props.textcolor}}>{props.text}</Link>
  )
}

export default NavigationLink