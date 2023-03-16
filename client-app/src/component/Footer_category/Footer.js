import React from "react";
import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles.js";
  
const Footer = () => {
  return (
    <Box>
      <hr />
      <Container>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="#">group@gmail.com</FooterLink>
            <FooterLink href="#">0123456789</FooterLink>
          </Column>
          <Column>
            <Heading>Personal</Heading>
            <FooterLink href="#">Security</FooterLink>
            <FooterLink href="#">Privacy</FooterLink>
          </Column>
          <Column>
          <Heading>Services</Heading>
            <FooterLink href="#">Account</FooterLink>
            <FooterLink href="#">Membership</FooterLink>
            <FooterLink href="#">Shipping</FooterLink>
          </Column>
          <Column>
          <Heading>Social Media</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;