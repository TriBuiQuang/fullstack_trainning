import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Card, CardHeader, CardBody, CardFooter, Input, InputGroup, Button } from "reactstrap";

import UserImage from "../../assets/img/user1.png";
function ChatComponent() {
   const Send = (e) => {
      if (e.key === "Enter") {
         console.log("do validate");
      }
   };
   useEffect(() => {
      const script = document.createElement("script");

      script.src = "https://telegram.org/js/telegram-widget.js?11";
      script.async = true;
      script.setAttribute("data-telegram-login", "samplebot");
      script.setAttribute("data-size", "large");
      script.setAttribute("data-onauth", "onTelegramAuth(user)");
      script.setAttribute("data-request-access", "write");
      script.setAttribute("Set-Cookie", "Secure;SameSite=Strict");
      console.log(script);
      document.body.appendChild(script);

      return () => {
         document.body.removeChild(script);
      };
   }, []);

   const onTelegramAuth = (user) => {
      alert("Logged in as " + user.first_name + " " + user.last_name + " (" + user.id + (user.username ? ", @" + user.username : "") + ")");
   };
   return (
      <Row>
         <Col>
            <Card className="chat-application">
               <CardHeader>Header</CardHeader>
               <CardBody className="overflow-auto">
                  <div className="chat-bubble ">
                     <div className="avatar d-inline">
                        <img src={UserImage} alt="UserImage" />
                     </div>
                     <div className="message d-inline">
                        <p className="user">Chat bot</p>
                        <p>message</p>
                     </div>
                  </div>
                  <div className="chat-bubble ">
                     <div className="avatar d-inline">
                        <img src={UserImage} alt="UserImage" />
                     </div>
                     <div className="message d-inline">
                        <p className="user">Chat bot</p>
                        <p>message</p>
                     </div>
                  </div>

                  <div className="chat-bubble me">
                     <div className="avatar d-inline">
                        <img src={UserImage} alt="UserImage" />
                     </div>
                     <div className="message d-inline">
                        <p className="user">Me</p>
                        <p>message</p>
                     </div>
                  </div>
               </CardBody>
               <CardFooter>
                  <InputGroup onKeyDown={(e) => Send(e)}>
                     {" "}
                     <Input className="mr-2" />
                     <Button className="rounded-circle mr-2">
                        <i className="fas fa-smile-beam" />
                     </Button>
                     <Button className="rounded-circle mr-2">
                        <i className="fas fa-ellipsis-h" />
                     </Button>
                     <Button className="rounded-circle">
                        <i className="fas fa-paper-plane" />
                     </Button>
                  </InputGroup>
               </CardFooter>
            </Card>
         </Col>
      </Row>
   );
}

export default withRouter(ChatComponent);
