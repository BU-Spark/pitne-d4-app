import React from 'react';
import {
  Page,
  PageSection,
  PageSectionVariants,
  TextContent,
  Text,
} from '@patternfly/react-core';
import './styles/ClientInfo.css'; // Import CSS file for styling
import LogoBar from 'components/home/LogoBar';

const ClientInfo: React.FC = () => {
  return (
    <Page>
      <LogoBar />
      <div className="councilor-info">
        <div className="councilor-image"></div>
        <TextContent>
          <Text component="h1" className="councilor-name">John Doe</Text>
        </TextContent>
      </div>
      <PageSection variant={PageSectionVariants.default}>
        <TextContent>
          <Text component="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque arcu id felis iaculis fermentum.
          </Text>
        </TextContent>
      </PageSection>
    </Page>
  );
};

export default ClientInfo;