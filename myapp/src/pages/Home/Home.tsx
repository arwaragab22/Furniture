import ImportProducts from "../../ADDproduct"
import LandingPage from "../../components/landingpage/Landingpage"
import { auth } from "../../firebase/firebase";

type Props = {}

function Home({}: Props) {  const currentUser = auth.currentUser;

  if (currentUser) {

  
  }
  return (
    <>
      {" "}
      <LandingPage></LandingPage>
    
    </>
  );
}

export default Home