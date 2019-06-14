import React from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import {Media} from 'react-md';

export const DemoVideoCard = () => {
  return <Card className="md-cell md-cell--6 md-cell--8-tablet">
    <Media>
      <iframe title="nirdizati" allowFullScreen src="
      https://drive.google.com/file/d/1ar7psIbXJckceubsTiNsAuTl_UpI0WjC/preview"/>
    </Media>
    <CardTitle title="Nirdizati Research demo"/>
    <CardText>
      <p>
        This video gives a brief explanation on how to use Nirdizati Research.
      </p>
    </CardText>
  </Card>;
};
