import { AccountContainer } from "./Account";
import { DashboardContainer } from "./Dashboard";
import { GroupContainer } from "./Group";
import { HomeContainer } from "./Home";
import { Onboarding1Container } from "./Onboarding1";
import { Onboarding2Container } from "./Onboarding2";
import { Onboarding3Container } from "./Onboarding3";
import { OtherContainer } from "./Other";
import { ProjectContainer } from "./Project";
import { GroupDetailContainer } from "./GroupDetail";
import { AddGroupContainer } from "./AddGroup";
import { DocumentContainer } from "./Document";

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
  VERIFY_MAIL = "VerifyMail",
  ACCOUNT = "Account",
  NOTIFICATION = "Notification",
  PROJECTDETAIL = "ProjectDetail",
  PROJECTEDIT = "ProjectEdit",
  GROUP_DETAIL = "GroupDetail",
  ADD_GROUP = "AddGroup",
  PROJECTCREATE = "ProjectCreate",
  DOCUMENT = "Document",
}

export {
  AccountContainer, DashboardContainer,
  GroupContainer,
  HomeContainer,
  Onboarding1Container,
  Onboarding2Container,
  Onboarding3Container,
  OtherContainer,
  ProjectContainer,
  GroupDetailContainer,
  AddGroupContainer,
  DocumentContainer
};

