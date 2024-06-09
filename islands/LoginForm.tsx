import { Button } from "../components/Button.tsx";
import { InputWithLabel } from "../components/InputWithLabel.tsx";

export const LoginForm = (props: {action: string}) => {
  return (
    <form class="mt-8" method="post" action={props.action}>
      <InputWithLabel id="password" name="password" label="password" placeholder="****" type="password"/>
      <div>
        <Button type="submit">Login</Button>
      </div>
    </form>
  )

}

