import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="129" r="126" />
    <rect x="-1" y="266" rx="0" ry="0" width="280" height="23" />
    <rect x="1" y="299" rx="8" ry="8" width="280" height="71" />
    <rect x="2" y="384" rx="8" ry="8" width="95" height="30" />
    <rect x="125" y="377" rx="20" ry="20" width="152" height="42" />
  </ContentLoader>
);
