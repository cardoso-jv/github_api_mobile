import React from 'react';
import PropTypes from 'prop-types';
import { WebView } from 'react-native-webview';

export default function Web({ route }) {
  const { repository } = route.params;
  return <WebView source={{ uri: repository.html_url }} style={{ flex: 1 }} />;
}

Web.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.shape({
        html_url: PropTypes.string,
      }),
    }),
  }).isRequired,
};

Web.routeOptions = ({ route }) => ({
  title: route.getParam('repository').name,
});
