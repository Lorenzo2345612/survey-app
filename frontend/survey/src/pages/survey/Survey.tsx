import React from "react";
import { getInitialData } from "../../utils/graph-utils";
import { socket, URL } from "../../socket";
import { useEffect, useState, useRef } from "react";
import "./Survey.css";
import { Graph } from "../../components/graph/Graph";
import { SurveyOptions } from "../../components/survey_options/SurveyOptions";

interface SurveyData {
  ok: boolean;
  survey: {
    ids: number[];
    labels: string[];
    name: string;
    values: number[];
  };
}

export const Survey = () => {
  const [graphData, setGraphData] = useState<number[]>([]);
  let labels = useRef<string[]>([]);
  let ids = useRef<number[]>([]);
  let name = useRef<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getInitialData(URL + "/survey/").then((data: SurveyData) => {
      if (data != null) {
        labels.current = data.survey.labels;
        ids.current = data.survey.ids;
        name.current = data.survey.name;
        setGraphData(data.survey.values);
        setIsLoading(false);
      }
    });

    socket.on("updated-votes", (payload: number[]) => {
      setGraphData(payload);
    });

    return () => {
      socket.off("updated-votes");
    };
  }, []);

  return (
    <div className="survey">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1> {name.current} </h1>
          <Graph values={graphData} labels={labels.current} title = { name.current }/>
          <SurveyOptions
            options = { labels.current }
            ids = { ids.current }
          />
        </div>
      )}
    </div>
  );
};
