import React, { useCallback } from "react";
import { useMemo, useState } from "react";
import { Form } from "react-bootstrap";
import { StyledAdditionalDiv, StyledColumnDiv } from "./StyledElements";

type ProfileInfo = {
  name: string;
  age: number;
  favFruit: string;
};

export function UseCallbackExampleBad(): JSX.Element {
  //We have some profile data
  const [profile, setProfile] = useState<ProfileInfo>({ name: "", age: 0, favFruit: "" });
  //and some data for an unrelated input on the page
  const [unrelatedString, setUnrelatedString] = useState<string>("");
  //as well as a count for how many times the profile data is updated
  const [profileDetailsUpdateCount, setCount] = useState<number>(0);

  return (
    <StyledColumnDiv>
      <h4>Some unrelated input:</h4>
      <Form.Control value={unrelatedString} onChange={(e) => setUnrelatedString(e.target.value)} />

      <ProfileDetailsComponent
        profile={profile}
        setFunction={(profile) => {
          //here we pass a lambda which will update the profile and increment the counter
          //by one, to keep track of how many times the profile has been updated.
          setCount((oldCount) => oldCount + 1);
          setProfile(profile);
        }}
      />
      <p>Profile details been updated {profileDetailsUpdateCount.toString()} times</p>

      <ProfileShower profile={profile} />
    </StyledColumnDiv>
  );
}

export function UseCallbackExampleGood(): JSX.Element {
  const [profile, setProfile] = useState<ProfileInfo>({ name: "", age: 0, favFruit: "" });
  const [unrelatedString, setUnrelatedString] = useState<string>("");
  const [profileDetailsUpdateCount, setCount] = useState<number>(0);
  //Here we are using useCallback to store a callback function. This value will only be updated when the values
  //in the dependency array change. In this case the dependency array is empty so it will always stay the same.
  const setProfileAndCount = useCallback((profile: ProfileInfo) => {
    setProfile(profile);
    setCount((oldCount) => oldCount + 1);
  }, []);
  //This helps to maintain reference equality, because it means we're passing in the same function to
  //ProfileDetailsComponent each time the parent component renders.

  return (
    <StyledColumnDiv>
      <h4>Some unrelated input:</h4>
      <Form.Control value={unrelatedString} onChange={(e) => setUnrelatedString(e.target.value)} />

      <ProfileDetailsComponent profile={profile} setFunction={setProfileAndCount} />
      <p>Profile details been updated {profileDetailsUpdateCount.toString()} times</p>

      <ProfileShower profile={profile} />
    </StyledColumnDiv>
  );
}

type ProfileDetailsSetterProps = { profile: ProfileInfo; setFunction: (profile: ProfileInfo) => void };
/**
 * You'll notice that even though this component is wrapped in React.memo (see the React.memo example) the component is
 * rerendering every single time the parent component rerenders in the bad example, even when profile isn't updated.
 * The reason for this is that the callback passed in as the setFunction is being recreated each time the parent rerenders.
 * Thus, even though the setFunction is effectively identical each time, it's technically a new callback being passed in
 * to the ProfileDetailsComponnet.
 *
 * In the good example we're storing the function using useCallback, and it will only be recreated when the values
 * in the dependency array (the second parameter) changes. In this case the dependency array is empty, so it will never
 * update the stored callback.
 */
const ProfileDetailsComponent = React.memo((props: ProfileDetailsSetterProps): JSX.Element => {
  console.log("Re-rendering the ProfileDetailsSetter component. This component doesn't need to render again unless the profile changes.");

  return (
    <StyledAdditionalDiv>
      <h5>Additional data component</h5>

      <h6>Enter user's Name:</h6>
      <Form.Control value={props.profile.name} onChange={(e) => props.setFunction({ ...props.profile, name: e.target.value })} />

      <h6>Enter user's age:</h6>
      <Form.Control
        type="number"
        value={props.profile.age}
        onChange={(e) => props.setFunction({ ...props.profile, age: Number(e.target.value) })}
      />

      <h6>Enter user's favourite fruit:</h6>
      <Form.Select aria-label="Default select example" onChange={(e) => props.setFunction({ ...props.profile, favFruit: e.target.value })}>
        <option value=""></option>
        <option value="Apple">Apple</option>
        <option value="Banana">Banana</option>
        <option value="Orange">Orange</option>
        <option value="Durian">Durian</option>
        <option value="Mango">Mango</option>
        <option value="Other">Other</option>
      </Form.Select>
    </StyledAdditionalDiv>
  );
});

type ProfileShowerProps = { profile: ProfileInfo };
const ProfileShower = React.memo((props: ProfileShowerProps): JSX.Element => {
  console.log("Rendering ProfileShower");
  return (
    <div>
      <p>Name: {props.profile.name}</p>
      <p>Age: {props.profile.age}</p>
      <p>Fruit: {props.profile.favFruit}</p>
    </div>
  );
});
