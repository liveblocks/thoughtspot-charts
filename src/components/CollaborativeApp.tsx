"use client";

import { Chart } from "./Chart";
import styles from "./CollaborativeApp.module.css";
import Highcharts from "highcharts";

export function CollaborativeApp() {
  return (
    <div className={styles.wrapper}>
      <Chart id="chart-1" options={chart1} showThreadList={true} />
      <div className={styles.grid}>
        <Chart id="chart-2" options={chart2} showThreadList={false} />
        <Chart id="chart-3" options={chart3} showThreadList={false} />
      </div>
    </div>
  );
}

const chart1: Highcharts.Options = {
  title: {
    text: "Estimated US Energy Consumption in 2017",
  },
  subtitle: {
    text: "Source: <a href='https://www.llnl.gov/'> Lawrence Livermore National Laboratory</a>",
  },
  accessibility: {
    point: {
      valueDescriptionFormat:
        "{index}. {point.from} to {point.to}, " + "{point.weight}.",
    },
  },
  tooltip: {
    pointFormat:
      "{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight:.2f} " +
      "quads",
  },
  series: [
    {
      keys: ["from", "to", "weight"],

      nodes: [
        {
          id: "Electricity & Heat",
          color: "#ffa500",
        },
        {
          id: "Residential",
          color: "#74ffe7",
          column: 2,
        },
        {
          id: "Commercial",
          color: "#8cff74",
          column: 2,
        },
        {
          id: "Industrial",
          color: "#ff8da1",
          column: 2,
        },
        {
          id: "Transportation",
          color: "#f4c0ff",
          column: 2,
        },
        {
          id: "Rejected Energy",
          color: "#e6e6e6",
          column: 3,
        },
        {
          id: "Energy Services",
          color: "#F9E79F",
          column: 3,
        },
        {
          id: "Solar",
          color: "#009c00",
        },
        {
          id: "Nuclear",
          color: "#1a8dff",
        },
        {
          id: "Hydro",
          color: "#009c00",
        },
        {
          id: "Wind",
          color: "#009c00",
        },
        {
          id: "Geothermal",
          color: "#009c00",
        },
        {
          id: "Natural Gas",
          color: "#1a8dff",
        },
        {
          id: "Biomass",
          color: "#009c00",
        },
        {
          id: "Coal",
          color: "#989898",
        },
        {
          id: "Petroleum",
          color: "#989898",
        },
      ],

      data: [
        ["Solar", "Electricity & Heat", 0.48],
        ["Nuclear", "Electricity & Heat", 8.42],
        ["Hydro", "Electricity & Heat", 2.75],
        ["Wind", "Electricity & Heat", 2.35],
        ["Geothermal", "Electricity & Heat", 0.15],
        ["Natural Gas", "Electricity & Heat", 9.54],
        ["Coal", "Electricity & Heat", 12.7],
        ["Biomass", "Electricity & Heat", 0.52],
        ["Petroleum", "Electricity & Heat", 0.21],

        ["Electricity & Heat", "Residential", 4.7],
        ["Solar", "Residential", 0.19],
        ["Geothermal", "Residential", 0.04],
        ["Natural Gas", "Residential", 4.58],
        ["Biomass", "Residential", 0.33],
        ["Petroleum", "Residential", 0.88],

        ["Electricity & Heat", "Commercial", 4.6],
        ["Solar", "Commercial", 0.08],
        ["Geothermal", "Commercial", 0.02],
        ["Natural Gas", "Commercial", 3.29],
        ["Coal", "Commercial", 0.02],
        ["Biomass", "Commercial", 0.16],
        ["Petroleum", "Commercial", 0.83],

        ["Electricity & Heat", "Industrial", 3.23],
        ["Solar", "Industrial", 0.02],
        ["Hydro", "Industrial", 0.01],
        ["Natural Gas", "Industrial", 9.84],
        ["Coal", "Industrial", 1.24],
        ["Biomass", "Industrial", 2.48],
        ["Petroleum", "Industrial", 8.38],

        ["Electricity & Heat", "Transportation", 0.03],
        ["Natural Gas", "Transportation", 0.76],
        ["Biomass", "Transportation", 1.43],
        ["Petroleum", "Transportation", 25.9],

        ["Electricity & Heat", "Rejected Energy", 24.7],
        ["Residential", "Rejected Energy", 3.75],
        ["Commercial", "Rejected Energy", 3.15],
        ["Industrial", "Rejected Energy", 12.9],
        ["Transportation", "Rejected Energy", 22.2],

        ["Residential", "Energy Services", 6.97],
        ["Commercial", "Energy Services", 5.84],
        ["Industrial", "Energy Services", 12.4],
        ["Transportation", "Energy Services", 5.91],
      ],
      type: "sankey",
      name: "Sankey demo series",
    },
  ],
};

const chart2: Highcharts.Options = {
  title: {
    text: "My chart",
  },
  series: [
    {
      type: "area",
      data: [1, 2, 3],
    },
  ],
};

const chart3: Highcharts.Options = {
  title: {
    text: "My other chart",
  },
  series: [
    {
      type: "bar",
      data: [5, 2, 3],
    },
  ],
};
