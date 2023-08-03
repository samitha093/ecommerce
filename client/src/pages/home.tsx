import Background from "../components/home/background";
import Card from "../components/home/card";

 function Home() {
  return (
    <div>
      <Background/>
      <div className="grid grid-cols-4 gap-4 mt-5">
          <div><Card/></div>
          <div> <Card/></div>
          <div><Card/></div>
          <div> <Card/></div>
          <div><Card/></div>
          <div> <Card/></div>
    </div>  
  </div>
  )
}
export default Home;