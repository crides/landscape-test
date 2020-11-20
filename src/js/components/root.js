import React, { Component, useState } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import _ from 'lodash';
import HeaderBar from "./lib/header-bar.js"

import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import dark from './themes/dark';

import { Text, Box, StatelessTextInput, Button, Image } from '@tlon/indigo-react';

export const Root = () => {
  const [poke_name, poke_name_change] = useState("");
  const [poke_sprite, poke_sprite_change] = useState("");
  const [show_sprite, show_sprite_change] = useState(false);
  const [message, message_change] = useState("Input something!");
  window.urb.subscribe("zod", "test", "/poke-primary", () => alert("conn"), (j) => {
    console.log(j);
    if (j == "") {
      show_sprite_change(false);
      message_change("Not found");
    } else {
      show_sprite_change(true);
      message_change("");
      poke_sprite_change(j)
    }
  }, () => alert("kick"))
  return (
    <BrowserRouter>
      <ThemeProvider theme={dark}>
      <Box display='flex' flexDirection='column' position='absolute' backgroundColor='white' height='100%' width='100%' px={[0,4]} pb={[0,4]}>
      <HeaderBar/>
      <Route exact path="/~test" render={ () => {
        return (
          <Box height='100%' p='4' display='flex' flexDirection='column' borderWidth={['none', '1px']} borderStyle="solid" borderColor="washedGray">
            <Text fontSize='1'>Pokedex</Text>
            <StatelessTextInput
              value={poke_name}
              onChange={(e) => poke_name_change(e.currentTarget.value)}
              hasError={(e) => alert(e)}
            ></StatelessTextInput>
            <Button children="Search" onClick={() => {
              show_sprite_change(false);
              message_change("Loading...");
              window.urb.poke("zod", "test", "json", poke_name, () => 0, () => 0)
            }}/>
            <Image src={poke_sprite} width={200} disabled={show_sprite}/>
            <Text fontSize='1'>{message}</Text>
          </Box>
        )}}
      />
      </Box>
      </ThemeProvider>
    </BrowserRouter>
  )
}
