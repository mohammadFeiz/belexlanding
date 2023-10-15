import React from 'react';
import RVD from './npm/react-virtual-dom/react-virtual-dom';
import svgs from './svgs';
import './App.css';

function App() {
  function timeBox_layout(n,unit){
    return {
      column:[
        {
          style:{border:'1px solid #fff'},
          className:'br-8 w-48 h-48 p-3',
          html:(
            <div className='w-100 h-100 br-6 align-vh fs-20' style={{background:'#fff',color:'#999'}}>{n}</div>
          )
        },
        {size:6},
        {html:unit,className:'fs-12',align:'vh',style:{color:'#aaa'}}
      ]
    }
  }
  return (
    <RVD
      layout={{
        className:'fs-24 container',
        column:[
          {
            style:{background:'#000',color:'#fff'},
            column:[
              {align:'vh',html:svgs('burux')},
              {html:'دومین گردهمایی بزرگ الکتریکی های سراسر کشور',style:{textAlign:'center'},className:'p-h-24',align:'h'},
              {size:36},
              {
                column:[
                  {html:'تا شروع',align:'vh',className:'fs-18',style:{color:'#aaa'}},
                  {size:12},
                  {
                    row:[
                      {flex:1},
                      {
                        row:[
                          timeBox_layout(10,'ثانیه'),
                          timeBox_layout(10,'دقیقه'),
                          timeBox_layout(10,'ساعت'),
                          timeBox_layout(10,'روز'),
                        ]
                      },
                      {flex:1}
                    ]
                  }
                ]
              },
              
            ]
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:1800,
            style:{background:'red'}

          },
          
          {
            size:1800,
            style:{background:'#fff'}
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
          {
            size:120
          },
        ]
      }}
    />
  );
}
export default App;
