import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import SiderBar from '../components/Sidebars';


export default function Routers(): JSX.Element {
    return (
      <Router>
        <Header/>
        <SiderBar/>
      </Router>
    );
  }