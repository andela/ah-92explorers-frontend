import React from 'react';
import { render } from 'react-dom';
import App from '../../components/App';


jest.mock("react-dom", () => ({ render: jest.fn() }));

describe('Index ', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    div.id = "root";
    document.body.appendChild(div);
    require("../../index.js");
    expect(render).toHaveBeenCalledWith(<App />, div);
  });
});