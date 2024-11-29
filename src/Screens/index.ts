import { HomeContainer } from "./Home";
import { Onboarding1Container } from "./Onboarding1";
import { Onboarding2Container } from "./Onboarding2";
import { Onboarding3Container } from "./Onboarding3";
import { ProjectContainer } from "./Project";
import { DashboardContainer } from "./Dashboard";
import { GroupContainer } from "./Group";
import { OtherContainer } from "./Other";

export enum RootScreens {
  MAIN = "Main",
  WELCOME = "Welcome",
  LOGIN = "Login",
  SIGNUP = "SignUp",
  FORGOT_PASSWORD = "ForgotPassword",
  RESET_PASSWORD = "ResetPassword",
  ONBOARDING1 = "Onboarding1",
  ONBOARDING2 = "Onboarding2",
  ONBOARDING3 = "Onboarding3",
}

export {HomeContainer, Onboarding1Container, Onboarding2Container, Onboarding3Container, ProjectContainer, DashboardContainer, GroupContainer, OtherContainer}
