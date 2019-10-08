import React, { Component } from "react";
import { components } from 'react-select';
const { Option, SingleValue } = components;

export const customSingleValue = (props) => (
  <SingleValue {...props}>
    {props.data.icon}
    {props.data.label}
  </SingleValue>
);

export const customOptionValue = (props) => (
  <Option {...props}>
    {props.data.icon}
    {props.data.label}
  </Option>
);