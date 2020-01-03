/* eslint-disable */
import React from 'react';

export default function Repository({ match }) {
  return <h1>Repository: {match.params.repository}</h1>;
}
