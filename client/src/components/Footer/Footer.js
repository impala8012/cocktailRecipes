import React from "react";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import {
  FooterContainer,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcon,
  WebsiteRights,
  SocialIcons,
  SocialIconLinks,
} from "./Footer.element";

const Footer = () => {
  return (
    <div>
      <FooterContainer>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to="/">
              <SocialIcon />
              理性飲酒
            </SocialLogo>
            <WebsiteRights>
              Copyright © Dylan 2021 All Rights Reserved.
            </WebsiteRights>
            <SocialIcons>
              <SocialIconLinks href="/" aria-label="Facebook">
                <FaFacebook />
              </SocialIconLinks>
              <SocialIconLinks href="/" aria-label="Instagram">
                <FaInstagram />
              </SocialIconLinks>
              <SocialIconLinks href="/" aria-label="Github">
                <FaGithub />
              </SocialIconLinks>
            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterContainer>
    </div>
  );
};

export default Footer;
