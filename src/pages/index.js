import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

const IndexPage = () => {
  useEffect(() => { navigate('/wiki/', { replace: true }); }, []);
  return null;
};

export default IndexPage;
