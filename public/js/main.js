{
  'use strict';
  const totalNum = document.getElementById('totalNum');
  const totalChart = document.getElementById('totalChart');
  const sexChart = document.getElementById('sexChart');
  const ageChart = document.getElementById('ageChart');
  const cityChart = document.getElementById('cityChart');
  const total_num = document.getElementById('total_num');
  const recent_date = document.getElementById('recent_date');
  const array_date = [];
  const array_date_total = [];
  const array_age = [];
  const array_age_total = [];
  const array_city = [];
  const array_city_total = [];
  let male_num = 0;
  let female_num = 0;
  let total_number_temp = 0;
  const url = 'https://raw.githubusercontent.com/kazuma007/ibaraki_json/master/ibaraki.json';

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      for (let i = 0; i < myJson.by_date.length; i++) {
        array_date.push(myJson.by_date[i].日付);
        total_number_temp += parseInt(myJson.by_date[i].人数);
        array_date_total.push(total_number_temp);
      }
      for (let j = 0; j < myJson.by_age.length; j++) {
        array_age.push(myJson.by_age[j].年齢);
        array_age_total.push(myJson.by_age[j].人数);
      }
      for (let k = 0; k < myJson.by_city.length; k++) {
        array_city.push(myJson.by_city[k].市町村);
        array_city_total.push(myJson.by_city[k].人数);
      }
      recent_date.textContent = myJson.date;
      male_num = myJson.by_sex[0].人数;
      female_num = myJson.by_sex[1].人数;
      total_num.textContent = parseInt(male_num) + parseInt(female_num) + '人';

      // 感染者数日別
      let totalChartTemp = new Chart(totalChart, {
        type: 'bar',
        data: {
          labels: array_date,
          datasets: [
            {
              label: '茨城県の感染者数',
              data: array_date_total,
              backgroundColor: "rgba(21,255,0,0.8)"
            }
          ]
        },
        options: {
          title: {
            display: true,
          },
          scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                suggestedMax: 20,
                suggestedMin: 0,
                stepSize: 20,
                callback: function (value, index, values) {
                  return value
                }
              }
            }]
          },
        }
      });
      // 性別のグラフ
      var sexChartTemp = new Chart(sexChart, {
        type: 'pie',
        data: {
          labels: ["男性", "女性"],
          datasets: [{
            backgroundColor: [
              "#BB5179",
              "#FAFF67"
            ],
            data: [male_num, female_num]
          }]
        },
        options: {
          title: {
            display: true
          }
        }
      });
      var ageChartTemp = new Chart(ageChart, {
        type: 'pie',
        data: {
          labels: array_age,
          datasets: [{
            backgroundColor: [
              "#BB5179",
              "#FAFF67",
              "#008080",
              "#00FF00",
              "#FF00FF",
              "#808000",
              "#800080",
              "#800000",
              "#3399FF",
              "#336666"
            ],
            data: array_age_total
          }]
        },
        options: {
          title: {
            display: true
          }
        }
      });

      // 市町村毎のグラフ
      let cityChartTemp = new Chart(cityChart, {
        type: 'horizontalBar',
        data: {
          labels: array_city,
          datasets: [
            {
              label: '市町村別の感染者数',
              data: array_city_total,
              backgroundColor: "rgba(21,255,0,0.8)"
            }
          ]
        },
        options: {
          title: {
            display: true,
          },
          scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                suggestedMax: 20,
                suggestedMin: 0,
                stepSize: 20,
                callback: function (value, index, values) {
                  return value
                }
              }
            }]
          },
        }
      });
      return false;
    });
}