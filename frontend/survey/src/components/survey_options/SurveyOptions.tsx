import React from 'react';
import { URL } from "../../socket";
import { sendVote as sendVoteAPI } from '../../utils/graph-utils'
import './SurveyOptions.css';

interface SurveyOptions {
    options: string[],
    ids: number[]
}

export const SurveyOptions = ({ options, ids}: SurveyOptions) => {
  const sendVote = (id: number) => {
    sendVoteAPI(String(id), URL+'/vote/');
  }

  return (
    <div className='surveyOptionContainer'>
      <h3>Options:</h3>
      <div className='bottonContainer'>
        {
            options.map((value, index) => {
                return <button className='surveyOptionBtn' key={ids[index]} onClick = { () => sendVote(ids[index]) }>{options[index]}</button>
            })
        }
      </div>
    </div>
  );
};
