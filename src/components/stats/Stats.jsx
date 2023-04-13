import { useContext, useEffect } from "react"
import BillsContext from '../../context/BillsContext'
import { getBills } from "../../services/getBills"
import Plot from 'react-plotly.js'
import calculateDataForPlots from "../../services/calculateDataForPlots"
import { useState } from "react"
import { getSummary } from "../../services/getSummary"

export default function Stats() {
  const {bills, setBills, summary, setSummary, loading, setLoading} = useContext(BillsContext)

  const [datesArray, setDatesArray] = useState([])
  const [accumUniqueWallets, setAccumUniqueWallets] = useState([])
  const [dailyUniqueWallets, setDailyUniqueWallets] = useState([])
  const [dailyAccumBillsSold, setDailyAccumBillsSold] = useState([])
  const [dailyBillsSold, setDailyBillsSold] = useState([])
  const [accumAcquiredValue, setAccumAcquiredValue] = useState([])
  const [dailyAcquiredValue, setDailyAcquiredValue] = useState([])
  const [accumVestedValue, setAccumVestedValue] = useState([])
  const [dailyVestedValue, setDailyVestedValue] = useState([])
  const [dailyRoi, setDailyRoi] = useState([])
  const [overallRoi, setOverallRoi] = useState([])

  const handleUpdate = async() => {
    setLoading(true)
    console.log('Fetched!')
    // const data = await dropUnwantedBills(await getBills())
    const data = await getBills()
    setBills(data)
    const data2 = await getSummary()
    setSummary(data2)
    setLoading(false)
  }

  useEffect(() => {
    if (bills.length == 0) {
      handleUpdate()
    } else {
      console.log("Did not fetch!")
    }
  }, [])

  useEffect(() => {
    const {dailyDates, dailyAccumWallets, dailyWallets, dailyAccumNumBills, dailyNumBills, dailyAccumDollarAcquiredValue, dailyDollarAcquiredValue, dailyAccumDollarVestedValue, dailyDollarVestedValue, dailyOverallRoi, averageOverallRoi} = calculateDataForPlots(bills)
    setDatesArray(dailyDates)
    setAccumUniqueWallets(dailyAccumWallets)
    setDailyUniqueWallets(dailyWallets)
    setDailyAccumBillsSold(dailyAccumNumBills)
    setDailyBillsSold(dailyNumBills)
    setAccumAcquiredValue(dailyAccumDollarAcquiredValue)
    setDailyAcquiredValue(dailyDollarAcquiredValue)
    setAccumVestedValue(dailyAccumDollarVestedValue)
    setDailyVestedValue(dailyDollarVestedValue)
    setDailyRoi(dailyOverallRoi)
    setOverallRoi(averageOverallRoi)
  }, [bills])

  return (
    loading
      ? <div className="loadingPage">
          <span className="loader"></span>
          <h1>Processing Data</h1>
        </div>
      : <div>
          <h1>ApeSwap Bonds' Overall Stats</h1>
          <div className="graphsContainer">
            {/*Plot Nº5*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: accumAcquiredValue,
                  type: 'bar',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#b10fe2'
                  }
                }
              ]}
              layout={ {
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  tickprefix: '$',
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "USD Value",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: 'Accumulated USD Value Sold By Bonds (Total Acquired Value)', plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº6*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: dailyAcquiredValue,
                  type: 'bar',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#4e0fe2'
                  }
                }
              ]}
              layout={ {
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  tickprefix: '$',
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "USD Value",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: 'USD Value Sold By Bonds on Each Day (Daily Acquired Value)', plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº7*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: accumVestedValue,
                  type: 'bar',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#6a0fe2'
                  }
                }
              ]}
              layout={ {
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  tickprefix: '$',
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "USD Value",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: "Accumulated USD Value Payed Out to Bonds' Buyers (Total Vested Value)", plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº8*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: dailyVestedValue,
                  type: 'bar',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#2c0163'
                  }
                }
              ]}
              layout={ {
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  tickprefix: '$',
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "USD Value",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: "USD Value Payed Out to Bonds' Buyers on Each Day (Daily Vested Value)", plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº9*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: dailyRoi,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#00be3f'
                  }
                }
              ]}
              layout={ {
                shapes: [
                  {
                      type: 'line',
                      xref: 'paper',
                      x0: 0,
                      y0: overallRoi,
                      x1: 1,
                      y1: overallRoi,
                      line:{
                          color: 'rgb(66, 0, 121)',
                          width: 2,
                      }
                  }
                ],
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  tickprefix: '%',
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "R.O.E.",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: `R.O.E. Per Day (Daily Acquired Value / Daily Vested Value) | Average R.O.E.: %${overallRoi}`,
                plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº1*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: accumUniqueWallets,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#09f'
                  }
                }
              ]}
              layout={ {
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "Number of Unique Wallets",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: 'Number of Unique Wallets Who Ever Purchased ApeSwap Bonds', plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº2*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: dailyUniqueWallets,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#4cff05'
                  }
                }
              ]}
              layout={ {
              margin: {
                l: 80,
                r: 80,
                t: 100,
                b: 60
              },
              xaxis: {
                automargin: true,
                showgrid: false,
                title: {
                  text: 'Date',
                  standoff: 15
                },
                tickfont: {
                  size: 10
                }
              },
              yaxis: {
                automargin: true,
                showgrid: false,
                rangemode: 'tozero',
                autorange: true,
                title: {
                  text: "Unique Wallets Per Day",
                  standoff: 10,
                }
              },
                width: 900, height: 500, title: 'Wallets Purchasing Bonds Each Day', plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº3*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: dailyAccumBillsSold,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#ffa600'
                  }
                }
              ]}
              layout={ {
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "Number of Bonds Sold",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: 'Accumulated Number of Bonds Sold Over Time', plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
            {/*Plot Nº4*/}
            <Plot
              data={[
                {
                  x: datesArray,
                  y: dailyBillsSold,
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: {
                    size: 7,
                    line: {
                      width: 0.5
                    },
                    opacity: 0.8,
                    color: '#e22f0f'
                  }
                }
              ]}
              layout={ {
                margin: {
                  l: 80,
                  r: 80,
                  t: 100,
                  b: 60
                },
                xaxis: {
                  automargin: true,
                  showgrid: false,
                  title: {
                    text: 'Date',
                    standoff: 15
                  },
                  tickfont: {
                    size: 10
                  }
                },
                yaxis: {
                  automargin: true,
                  showgrid: false,
                  rangemode: 'tozero',
                  autorange: true,
                  title: {
                    text: "Number of Bonds Sold",
                    standoff: 10,
                  }
                },
                width: 900, height: 500, title: 'Daily Number of Bonds Sold', plot_bgcolor:"#faefddf8", paper_bgcolor:"#242424", font: {color: '#fff'}} }
              style={{border: '2px solid white'}} // adds style to the plotly container div
            />
          </div>
        </div>
  )
}
