import React, { useState } from 'react';
import RVD from './npm/react-virtual-dom/react-virtual-dom';
import AIODate from './npm/aio-date/aio-date';
import AIOInput from './npm/aio-input/aio-input';
import AIOMap from './npm/aio-map/aio-map';
import AIOservice from './npm/aio-service/aio-service';
import getApiFunctions from './apis';
import row1src from './images/row1.png';
import bmsrc from './images/bm.png';
import mojrisrc from './images/mojri.png';
import footersrc from './images/footer.png';
import img11 from './images/ic.png';
import bg2 from './images/bg2.png';
import frame1 from './images/frame1.png';
import registersrc from './images/register.png';
import svgs from './svgs';
import './App.css';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

function App() {
  let [register,setRegister] = useState(false);
  let [map] = useState(new AIOMap({
    apiKeys: {
      map: 'web.68bf1e9b8be541f5b14686078d1e48d2',
      service: 'service.30c940d0eff7403f9e8347160e384cc9'
    },
    popup: { title: 'موقعیت محل برگزاری همایش' },
    markers: [
      { latitude: 35.7905040814412, longitude: 51.40696048736573 }
    ],
    showMarker: false,
    latitude: 35.7905040814412, longitude: 51.40696048736573
  }))
  function row1_layout() {
    return {
      className: 'bg1',
      column: [
        {html:<img src={row1src} width='100%'/>},
        {
          className:'titr',
          column: [
            { size: 24 },
            { align: 'vh', html: svgs('burux'), size: 100 },
            { html: <div><span style={{fontWeight:'bold',fontSize:'110%'}}>دومین</span> گردهمایی بزرگ الکتریکی های سراسر کشور</div>, style: { textAlign: 'center' }, className: 'p-h-24', align: 'h' },
            {size:24},
            { html: <TimeBoxes /> },
          ]
        }
      ]
    }
  }
  function row2_layout() {
    return {
      style: { background: '#fff' },
      column: [
        { html: (<img src={mojrisrc} alt='' width='100%' />), style: { background: '#fff' } },
        { html: (<img src={bg2} alt='' width='100%' />), style: { background: '#fff' } },
        { size: 36 },
        tarikheBargozari_layout(),
        { html: (<img src={img11} width='100%' />), className: 'p-h-24' }
      ]
    }
  }
  function row3_layout() {
    return {
      style: { color: '#fff' },
      column: [
        {
          className: 'grd2',
          column: [
            { size: 24 },
            {
              size: 48, align: 'v',
              row: [
                { size: 48, style: { background: '#0095DA', height: '100%' } },
                { size: 12 },
                {
                  gap: 8, className: 'fs-20', align: 'v',
                  row: [{ html: 'چرا در' }, { html: 'بلکس', className: 'bold fs-24' }, { html: 'شرکت کنم?' }]
                }
              ]
            },
            { size: 36 },
            { gap: 36, column: new Array(6).fill(0).map((o, i) => dashBox_layout(i)) },
            { size: 72 },
            {
              html:<img src={frame1} width='100%'/>
            }
          ]
        }
      ]
    }
  }
  function row4_layout() {
    return {
      style: { background: '#fff' },
      column: [
        {
          html: '', style: { background: '#0095DA', height: 24, borderRadius: '0 0 24px 24px' }
        },
        {
          html: 'برنامه همایش', className: 'fs-24', align: 'vh', size: 120,
        },
        propgrams_layout(),
        video_layout(),
        { size: 48 }
      ]
    }
  }
  
  
  async function share(){
    try {
      await navigator.share({
        title: "همایش بلکس 2023",
        text: "ثبت نام برای شرکت در همایش بزرگ بلکس 2023 تهران واقع در سالن همایش های صدا و سیما",
        url: document.location.href,
      })

       /*
         Show a message if the user shares something
       */
   } catch (err) {
      /*
         This error will appear if the user canceled the action of sharing.
       */
      alert(`Couldn't share ${err}`);
   }
  }
  function row5_layout() {
    return {
      style: { background: '#fff' },
      column: [
        {
          column: [
            { html: 'محل برگزاری', size: 60, align: 'vh' },
            {
              size: 240, className: 'p-12',
              row: [
                {
                  flex: 1, align: 'v',
                  column: [
                    { html: 'آدرس', className: 'fs-16 bold' },
                    { size: 24 },
                    {
                      html: 'تهران ، اتوبان شهید چمران شمال ، نرسیده به هتل استقلال ، ورودی شمالی صدا و سیما ، درب اختصاصی مرکز همایش ها',
                      className: 'fs-14 t-a-right'
                    }
                  ]
                },
                { size: 12 },
                {
                  flex: 1,
                  html: map.render()
                }
              ]
            },
            { size: 12 },
            {
              className: 'p-h-12',
              row: [
                {
                  flex: 1, align: 'vh',
                  html: (<a className='button-2' href={'https://www.google.com/maps/place/Tehran+Province,+Tehran,+Namayeshgah,+Iran/@35.7909431,51.4070741,21z/data=!4m6!3m5!1s0x3f8e063f05847e43:0x13d203c15b177604!8m2!3d35.7908941!4d51.4068914!16s%2Fg%2F11c2w204jr'}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.59818 4.04464C11.0626 2.58017 13.437 2.58017 14.9015 4.04464L20.2048 9.34794C21.6693 10.8124 21.6693 13.1868 20.2048 14.6512L14.9015 19.9545C13.437 21.419 11.0626 21.419 9.59818 19.9545L4.29488 14.6512C2.83042 13.1868 2.83042 10.8124 4.29488 9.34794L9.59818 4.04464ZM13.8408 5.1053C12.9621 4.22662 11.5375 4.22662 10.6588 5.1053L5.35554 10.4086C4.47686 11.2873 4.47686 12.7119 5.35554 13.5906L10.6588 18.8939C11.5375 19.7726 12.9621 19.7726 13.8408 18.8939L19.1441 13.5906C20.0228 12.7119 20.0228 11.2873 19.1441 10.4086L13.8408 5.1053ZM12.4695 6.96926C12.7624 6.67637 13.2373 6.67637 13.5302 6.96926L15.7802 9.21926C16.0731 9.51215 16.0731 9.98703 15.7802 10.2799L13.5302 12.5299C13.2373 12.8228 12.7624 12.8228 12.4695 12.5299C12.1766 12.237 12.1766 11.7622 12.4695 11.4693L13.4392 10.4996H11.4998C11.0856 10.4996 10.7498 10.8354 10.7498 11.2496V14.9996C10.7498 15.4138 10.414 15.7496 9.99983 15.7496C9.58562 15.7496 9.24983 15.4138 9.24983 14.9996V11.2496C9.24983 10.0069 10.2572 8.99959 11.4998 8.99959H13.4392L12.4695 8.02992C12.1766 7.73703 12.1766 7.26215 12.4695 6.96926Z" fill="currentColor" />
                    </svg>

                    مسیر یابی
                  </a>)
                },
                { size: 12 },
                {
                  flex: 1, align: 'vh',
                  html: (<button className='button-5' onClick={()=>share()}>
                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.6501 6.60191C14.6501 4.94405 15.9941 3.6001 17.6519 3.6001C19.3098 3.6001 20.6537 4.94405 20.6537 6.60191C20.6537 8.25976 19.3098 9.60372 17.6519 9.60372C16.6919 9.60372 15.8372 9.15309 15.2877 8.45182L9.74811 11.2216C9.81463 11.4699 9.8501 11.7309 9.8501 12.0001C9.8501 12.2692 9.81466 12.5301 9.74819 12.7782L15.2893 15.5488C15.8385 14.8494 16.6918 14.4001 17.6501 14.4001C19.307 14.4001 20.6501 15.7432 20.6501 17.4001C20.6501 19.057 19.307 20.4001 17.6501 20.4001C15.9932 20.4001 14.6501 19.057 14.6501 17.4001C14.6501 17.1309 14.6855 16.87 14.752 16.6218L9.211 13.8513C8.66177 14.5508 7.80841 15.0001 6.8501 15.0001C5.19324 15.0001 3.8501 13.657 3.8501 12.0001C3.8501 10.3432 5.19324 9.0001 6.8501 9.0001C7.80829 9.0001 8.66156 9.44932 9.21079 10.1486L14.7515 7.37829C14.6853 7.13065 14.6501 6.87039 14.6501 6.60191ZM17.6519 4.8001C16.6568 4.8001 15.8501 5.6068 15.8501 6.60191C15.8501 7.59702 16.6568 8.40372 17.6519 8.40372C18.647 8.40372 19.4537 7.59702 19.4537 6.60191C19.4537 5.6068 18.647 4.8001 17.6519 4.8001ZM17.6501 15.6001C16.656 15.6001 15.8501 16.406 15.8501 17.4001C15.8501 18.3942 16.656 19.2001 17.6501 19.2001C18.6442 19.2001 19.4501 18.3942 19.4501 17.4001C19.4501 16.406 18.6442 15.6001 17.6501 15.6001ZM5.0501 12.0001C5.0501 12.9942 5.85599 13.8001 6.8501 13.8001C7.84421 13.8001 8.6501 12.9942 8.6501 12.0001C8.6501 11.006 7.84421 10.2001 6.8501 10.2001C5.85599 10.2001 5.0501 11.006 5.0501 12.0001Z" fill="currentColor" />
                    </svg>

                    اشتراک گذاری
                  </button>)
                }
              ]
            },
            
            { size: 48 },
            { html: 'منتظر حضور گرم شما هستیم ', align: 'vh', className: 'fs-20 bold', style: { textAlign: 'center' } },
            { html: 'دیدار ما، از 22 تا 26 آبان ماه 1402 ', align: 'vh', className: 'fs-18', style: { textAlign: 'center' } },
            { size: 48 }
          ]
        }
      ]
    }
  }
  function buttons_layout() {
    return {
      className: 'buttons p-12',
      style: { boxShadow: '0 0 6px 1px rgba(0,0,0,0.3)' },
      column: [
        {
          className: 'p-h-24 m-b-12',
          html: (
            <button className='button-2' onClick={()=>setRegister(true)}>ثبت نام رایگان</button>
          )
        },
        {
          style: { color: '#0080BB' }, align: 'vh',
          className: 'fs-14 m-b-24 bold',
          html: (
            '23 تا 26 آبان در تهران، سالن همایش های صدا و سیما'
          )
        },
      ]
    }
  }
  function tarikheBargozari_layout() {
    return {
      column: [
        {
          className: 'c747474', align: 'vh', gap: 6,
          row: [
            { html: 'همزمان', className: 'fs-18 bold' },
            { html: 'با', className: 'fs-14' },
            {
              html: (
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.0707 35C9.69732 35 9.36132 34.9113 9.06266 34.734C8.77332 34.5567 8.53999 34.2767 8.36266 33.894C8.18532 33.5113 8.09666 33.0353 8.09666 32.466H8.97866C8.97866 32.8487 9.07199 33.1147 9.25866 33.264C9.45466 33.4133 9.72532 33.488 10.0707 33.488H10.3087L10.4067 34.272L10.3087 35H10.0707ZM2.24466 31.486C2.00199 31.99 1.81532 32.4847 1.68466 32.97C1.55399 33.446 1.48866 33.922 1.48866 34.398C1.48866 34.93 1.56799 35.392 1.72666 35.784C1.89466 36.176 2.15599 36.4793 2.51066 36.694C2.87466 36.9087 3.34132 37.016 3.91066 37.016H5.31066C5.92666 37.016 6.40266 36.9507 6.73866 36.82C7.07466 36.6893 7.30799 36.4747 7.43866 36.176C7.57866 35.8867 7.64866 35.4807 7.64866 34.958V30.562H8.97866V34.958C8.97866 36.0687 8.67999 36.9413 8.08266 37.576C7.49466 38.2107 6.57066 38.528 5.31066 38.528H3.91066C3.10799 38.528 2.42666 38.3367 1.86666 37.954C1.30666 37.5807 0.88199 37.0767 0.592656 36.442C0.312656 35.8167 0.172656 35.1353 0.172656 34.398C0.172656 33.7913 0.261323 33.1847 0.438656 32.578C0.625323 31.9713 0.858656 31.4067 1.13866 30.884L2.24466 31.486ZM4.12066 30.114C4.39132 30.114 4.65732 30.114 4.91866 30.114C5.17999 30.114 5.43199 30.114 5.67466 30.114C5.67466 30.4593 5.67466 30.716 5.67466 30.884C5.67466 31.052 5.67466 31.3087 5.67466 31.654C5.31999 31.654 5.05866 31.654 4.89066 31.654C4.72266 31.654 4.46599 31.654 4.12066 31.654C4.12066 31.2993 4.12066 31.038 4.12066 30.87C4.12066 30.702 4.12066 30.45 4.12066 30.114ZM10.1624 33.488H13.0744L13.1584 34.23L13.0744 35H10.1624V33.488ZM12.9378 33.488H15.8498L15.9338 34.23L15.8498 35H12.9378V33.488ZM15.7132 33.488H18.6252L18.7092 34.23L18.6252 35H15.7132V33.488ZM18.4886 33.488H21.4006L21.4846 34.23L21.4006 35H18.4886V33.488ZM25.408 30.562V32.564C25.408 32.9 25.4873 33.138 25.646 33.278C25.814 33.418 26.08 33.488 26.444 33.488H27.172L27.256 34.286L27.172 35H26.444C26.0987 35 25.744 34.9113 25.38 34.734C25.016 34.5567 24.708 34.2767 24.456 33.894C24.204 33.502 24.078 33.012 24.078 32.424V30.562H25.408ZM25.24 32.62C25.24 33.1333 25.1187 33.572 24.876 33.936C24.6427 34.2907 24.3347 34.5567 23.952 34.734C23.5787 34.9113 23.1913 35 22.79 35H21.264V33.488H22.79C23.238 33.488 23.5647 33.404 23.77 33.236C23.9753 33.068 24.078 32.7973 24.078 32.424L25.24 32.62ZM20.648 37.002C20.872 37.002 21.04 37.002 21.152 37.002C21.264 37.002 21.432 37.002 21.656 37.002C21.8147 37.002 21.978 37.002 22.146 37.002C22.146 37.338 22.146 37.5853 22.146 37.744C22.146 37.912 22.146 38.1593 22.146 38.486C21.8007 38.486 21.544 38.486 21.376 38.486C21.2173 38.486 20.9747 38.486 20.648 38.486C20.648 38.15 20.648 37.898 20.648 37.73C20.648 37.5713 20.648 37.3287 20.648 37.002ZM23.196 37.002C23.5413 37.002 23.7933 37.002 23.952 37.002C24.12 37.002 24.3673 37.002 24.694 37.002C24.694 37.338 24.694 37.5853 24.694 37.744C24.694 37.912 24.694 38.1593 24.694 38.486C24.3487 38.486 24.092 38.486 23.924 38.486C23.7653 38.486 23.5227 38.486 23.196 38.486C23.196 38.15 23.196 37.898 23.196 37.73C23.196 37.5713 23.196 37.3287 23.196 37.002ZM27.0335 33.488H27.4115C27.6262 33.488 27.7942 33.4413 27.9155 33.348C28.0368 33.2547 28.1208 33.1053 28.1675 32.9L28.5875 31.388C28.7928 30.632 29.1195 30.044 29.5675 29.624C30.0155 29.204 30.5568 28.994 31.1915 28.994C31.6955 28.994 32.1435 29.1387 32.5355 29.428C32.9275 29.708 33.2308 30.0953 33.4455 30.59C33.6602 31.0847 33.7675 31.626 33.7675 32.214C33.7675 32.9327 33.6602 33.5207 33.4455 33.978C33.2308 34.4353 32.9555 34.7713 32.6195 34.986C32.2835 35.1913 31.9335 35.294 31.5695 35.294C31.2148 35.294 30.8462 35.2193 30.4635 35.07C30.0902 34.9207 29.4975 34.6407 28.6855 34.23L28.3215 34.048L28.9235 32.732C29.0168 32.7787 29.1055 32.8253 29.1895 32.872C29.9455 33.2453 30.4728 33.4927 30.7715 33.614C31.0702 33.7353 31.3455 33.796 31.5975 33.796C31.8868 33.796 32.1062 33.684 32.2555 33.46C32.4142 33.2267 32.4935 32.8113 32.4935 32.214C32.4935 31.6727 32.3815 31.248 32.1575 30.94C31.9335 30.632 31.6208 30.478 31.2195 30.478C30.9022 30.4687 30.6222 30.576 30.3795 30.8C30.1462 31.024 29.9735 31.3553 29.8615 31.794L29.4275 33.39C29.3435 33.698 29.1988 33.978 28.9935 34.23C28.7882 34.4727 28.5455 34.664 28.2655 34.804C27.9948 34.9347 27.7148 35 27.4255 35H27.0335V33.488ZM34.6334 23.818L36.7614 23.16C37.0041 23.0853 37.1814 22.9733 37.2934 22.824C37.4054 22.6653 37.4288 22.4927 37.3634 22.306C37.2981 22.1193 37.1721 21.9933 36.9854 21.928C36.7988 21.8533 36.5841 21.8673 36.3414 21.97C36.1268 22.054 35.9774 22.1707 35.8934 22.32C35.8094 22.46 35.7908 22.614 35.8374 22.782C35.9121 23.0247 36.0101 23.2113 36.1314 23.342C36.1688 23.3793 36.2061 23.412 36.2434 23.44C36.2808 23.468 36.3181 23.4913 36.3554 23.51L35.9354 23.944L35.8654 23.888C35.7348 23.7947 35.6181 23.6827 35.5154 23.552C35.4128 23.412 35.3241 23.23 35.2494 23.006C35.1748 22.754 35.1608 22.5067 35.2074 22.264C35.2541 22.0213 35.3568 21.8113 35.5154 21.634C35.6834 21.4473 35.8934 21.312 36.1454 21.228C36.5374 21.088 36.9014 21.0973 37.2374 21.256C37.5734 21.4053 37.8068 21.6853 37.9374 22.096C38.0681 22.488 38.0308 22.852 37.8254 23.188C37.6201 23.5147 37.2981 23.7527 36.8594 23.902L34.8294 24.56L34.6334 23.818ZM35.7177 25.83H37.0337L37.0477 35H35.7317L35.7177 25.83Z" fill="#00A9F7" />
                  <path d="M3.9325 0.431999C4.59383 2.288 5.0845 4.02667 5.4045 5.648C5.7245 7.248 5.9165 8.73067 5.9805 10.096C6.0445 11.4613 6.0765 13.0827 6.0765 14.96V15.92L6.0125 22H1.9165L1.9805 15.92V15.184C2.00183 13.2853 1.9805 11.7173 1.9165 10.48C1.8525 9.24267 1.68183 7.94133 1.4045 6.576C1.12717 5.18933 0.689833 3.65333 0.0925001 1.968L3.9325 0.431999ZM13.4365 0.463999L14.0445 4.496C14.2578 5.92533 14.0978 7.216 13.5645 8.368C13.0312 9.49867 12.2632 10.384 11.2605 11.024C10.2578 11.6427 9.19117 11.952 8.0605 11.952C6.50317 11.952 5.22317 11.4827 4.2205 10.544C3.23917 9.584 2.47117 8.13333 1.9165 6.192L5.2445 5.04C5.45783 5.89333 5.7885 6.49067 6.2365 6.832C6.70583 7.17333 7.31383 7.344 8.0605 7.344C8.48717 7.344 8.8605 7.25867 9.1805 7.088C9.5005 6.91733 9.73517 6.66133 9.8845 6.32C10.0338 5.95733 10.0658 5.50933 9.9805 4.976L9.4045 1.136L13.4365 0.463999ZM20.8388 0.431999C21.5001 2.288 21.9908 4.02667 22.3108 5.648C22.6308 7.248 22.8228 8.73067 22.8868 10.096C22.9508 11.4613 22.9828 13.0827 22.9828 14.96V15.92L22.9188 22H18.8228L18.8868 15.92V15.184C18.9081 13.2853 18.8868 11.7173 18.8228 10.48C18.7588 9.24267 18.5881 7.94133 18.3108 6.576C18.0334 5.18933 17.5961 3.65333 16.9988 1.968L20.8388 0.431999ZM29.4148 1.136L29.9588 4.816C30.1721 6.20267 30.0334 7.45067 29.5428 8.56C29.0521 9.66933 28.3481 10.544 27.4308 11.184C26.5348 11.8027 25.5961 12.1013 24.6148 12.08C23.1854 12.0587 22.0014 11.5893 21.0628 10.672C20.1241 9.73333 19.3988 8.31467 18.8868 6.416L22.2468 5.36C22.3961 6.21333 22.6414 6.78933 22.9828 7.088C23.3454 7.36533 23.8361 7.49333 24.4548 7.472C24.7534 7.45067 25.0308 7.376 25.2868 7.248C25.5428 7.09867 25.7241 6.864 25.8308 6.544C25.9588 6.224 25.9908 5.808 25.9268 5.296L25.4148 1.744L29.4148 1.136ZM36.4548 0.623999L36.9668 4.88C37.1588 6.30933 37.0308 7.57867 36.5828 8.688C36.1561 9.79733 35.5161 10.6507 34.6628 11.248C33.8094 11.824 32.8601 12.112 31.8148 12.112C30.3428 12.112 29.1268 11.5467 28.1668 10.416C27.2068 9.28533 26.6094 7.61067 26.3748 5.392L29.9588 4.848C30.1081 5.872 30.3108 6.576 30.5668 6.96C30.8441 7.32267 31.2281 7.504 31.7188 7.504C32.2308 7.48267 32.5828 7.30133 32.7748 6.96C32.9668 6.61867 33.0201 6.08533 32.9348 5.36L32.4228 1.168L36.4548 0.623999Z" fill="#00A9F7" />
                </svg>
              )
            },
            { html: 'نمایشگاه بین المللی صنعت برق', className: 'fs-14' }
          ]
        },
        { size: 36 },
        { html: 'زمان برگزاری:', className: 'fs-18 bold p-h-48 m-b-12' },
        {
          align: 'vh', gap: 24, className: 'p-v-12',gapHtml:()=>'و',gapAttrs:{style:{fontSize:14}},
          row: [23, 24, 25, 26].map((day) => { return { className: 'of-visible', html: (<div className='day-box'>{day}</div>) } })
        },
        { size: 12 },
        { align: 'vh', className: 'of-visible', html: <div className='date-box of-visible p-v-12 align-vh'>آبان ماه 1402</div> },
        { size: 36 }
      ]
    }
  }
  function dashBox_layout(index) {
    let title = ['دورهمی شاد و خاطره ساز', 'شانس و جایزه ', 'تخفیفات باور نکردنی', 'معرفی محصولات جدید', 'کسب و کار جدید', 'هدفی بزرگ اما نزدیک'][index]
    let text = [
      ' لحظاتی شاد و مفرح با اجرای جذاب و بیادماندنی ',
      'شرکت در قرعه کشی بزرگِ سال با اجرای مسابقه به همراه تخفیف و جوایز ویژه',
      'خرید با قیمت ها و شرایط ویژه که فقط برای حاضرین امکانپذیر است',
      'آشنایی با محصولات جدید بروکس در حوزه روشنایی، ابزار، محافظ و چندراهی، برق صنعتی و هوشمندسازی',
      'چگونه بدون هزینه فروش اینترنتی خود را افزایش دهید!',
      'شاید امروز همان روزی است که باید برای هدف بزرگت قدمی حتی کوچک برداری پس همین امروز شروع کن'
    ][index]
    return {
      className: 'p-h-12',
      row: [
        { align:'vh',html: svgs('dashBox' + index), flex: 1,show:index % 2 === 0 },
        { className: 'dash-box1', gap: 12, column: [{ html: title, className: 'bold' }, { html: text,className:'t-a-right' }] },
        { align:'vh',html: svgs('dashBox' + index), flex: 1,show:index % 2 !== 0 }
      ]
    }
  }
  function propgrams_layout() {
    let list = [
      {
        title: 'فروشگاه آنلاین می ارزه',
        text: 'بهترین لذت زندگی آن است که کاری انجام دهید که دیگران می­گویند تو نمیتوانی'
      },
      {
        title: 'محصولات جدید و تخفیفات ویژه',
        text: 'فرصتی کوتاه برای خریدی آسان با قیمت­ها و شرایط ویژه و تکرار نشدنی و معرفی محصولات جدید'
      },
      {
        title: 'مسابقه و قرعه کشی های متعدد',
        text: 'بلکس 2023، علاوه بر ایجاد اوقاتی شاد و مفرح برای شما الکتریکی عزیز، فرصت مشارکت در قرعه کشی بزرگ سال را فراهم می­کند.'
      }
    ]
    return { className: 'm-b-24', column: list.map((o,i) => {return {html:program_card(o,i)}})}
  }
  function program_card({ title, text },index) {
    return (
      <RVD
        layout={{
          className: 'dir-rtl p-h-12',
          row:[
            {
              column: [
                { size:36,html: <div style={{ background: 'orange',color:'#fff' }} className='br-100 h-3 w-36 h-36'>{index + 1}</div>,align:'vh' },
                { flex: 1, html: <div className='w-3 h-100' style={{ background: 'orange' }}></div> ,align:'h'},

              ]
            },
            {size:12},
            {
              flex:1,
              column: [
                { html: title, className: 'fs-16 bold t-a-right',size:36,align:'v' },
                { size: 12 },
                { html: text, className: 'fs-14 t-a-right' },
                { size: 24 },
                
              ]
            }
          ]
          
        }}
      />
    )
  }
  function video_layout() {
    return {
      column: [
        { size: 60, html: 'تجربه موفق سال قبل', className: 'fs-20', align: 'vh' },
        {
          align:'vh',
          html: (
            
            <div class="h_iframe-aparat_embed_frame" style={{width:'100%'}}>
            <iframe className='w-100' src="https://www.aparat.com/video/video/embed/videohash/QMCfy/vt/frame"  allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>
          )

        }
      ]
    }
  }
  function bazarMiarze_layout() {
    return {
      html: (
        <img
          src={bmsrc} width='100%' alt=""
        />
      )
    }
  }
  function footer_layout() { return { html: (<img src={footersrc} width='100%' alt="" />) } }
  if(register){
    return <Register onClose={()=>setRegister(false)}/>
  }
  return (
    <RVD
      layout={{
        className: 'fs-24 container',
        column: [
          {
            flex: 1, className: 'ofy-auto main',
            column: [
              row1_layout(),
              row2_layout(),
              row3_layout(),
              row4_layout(),
              bazarMiarze_layout(),
              row5_layout(),
              footer_layout(),
            ]
          },
          buttons_layout()

        ]
      }}
    />
  );
}
export default App;


function TimeBoxes() {
  let [delta, setDelta] = useState(AIODate().getDelta({ date: '1402/8/22' }))
  setInterval(() => {
    setDelta(AIODate().getDelta({ date: '1402/8/22' }))
  }, 1000)
  function timeBox_layout(n, unit) {
    return {
      column: [
        {
          style: { border: '1px solid #fff' },
          className: 'br-8 w-60 h-60 p-3',
          html: (
            <div className='w-100 h-100 br-6 align-vh fs-24 bold' style={{ background: '#00A9F7', color: '#fff' }}>{n}</div>
          )
        },
        { size: 6 },
        { html: unit, className: 'fs-14 bold', align: 'vh', style:{ color: '#00A9F7'} }
      ]
    }
  }
  return (
    <RVD
      layout={{
        column: [
          { html: 'تا شروع', align: 'vh', className: 'fs-18 bold', style: { color: '#00A9F7' } },
          { size: 12 },
          {
            row: [
              { flex: 1 },
              {
                gap: 12,
                row: [
                  timeBox_layout(delta.second, 'ثانیه'),
                  timeBox_layout(delta.minute, 'دقیقه'),
                  timeBox_layout(delta.hour, 'ساعت'),
                  timeBox_layout(delta.day, 'روز'),
                ]
              },
              { flex: 1 }
            ]
          },
          { size: 24 }
        ]
      }}
    />
  )
}

function Register(props){
  let [interCode,setInterCode] = useState(false);
  let [code,setCode] = useState('')
  let [apis] = useState(new AIOservice({
    id:'belex',
    getApiFunctions,

  }))
  function header_layout(){
    return {
      className:'register-header',
      column:[
        {
          size:48,
          row:[
            {size:48,align:'vh',html:<Icon path={mdiClose} size={1}/>,onClick:()=>onClose()},
            {flex:1,html:'بستن',align:'v'}
          ]
        }
      ]
    }
  }
  function billboard_layout(){
    return {
      html:(
        <img src={registersrc} width='100%' />
      )
    }
  }
  function label_layout(){
    return {
      column:[
        {size:12},
        {html:'اطلاعات شرکت کننده',className:'fs-16 bold p-h-12'},
        {html:'با مشخصات شما کارت ورود به همایش صادر خواهد شد، لطفا از صحت آنها اطمینان حاصل فرمائید.',className:'fs-14 p-h-12 t-a-right'},
        
      ]
    }
  }
  function form_layout(model){
    return {
      html:(
        <AIOInput
          type='form' lang='fa'
          value={{...model}}
          onChange={(newModel)=>{
            setModel(newModel)
          }}
          onSubmit={()=>submit()}
          submitText='دریافت کد تایید'
          inputs={{
            column:[
              {input:{type:'text'},label:'نام',field:'value.firstname',validations:[['required']]},
              {input:{type:'text'},label:'نام خانوادگی',field:'value.lastname',validations:[['required']]},
              {input:{type:'text',justNumber:true},label:'شماره همراه',field:'value.mobile',validations:[['required'],['length=',11]]},
              {input:{type:'text',justNumber:true},label:'کد ملی',field:'value.nationalCode',validations:[['required']]},
              {input:{type:'text'},label:'استان',field:'value.province',validations:[['required']]},
              {input:{type:'textarea'},label:'آدرس ( اختیاری )',field:'value.address'},
              {
                input:{
                  type:'radio',optionStyle:{width:'100%'},
                  options:[
                    {text:'سه شنبه 23 آبان ',value:'23'},
                    {text:'چهار شنبه 24 آبان ',value:'24'},
                    {text:'پنج شنبه 25 آبان ',value:'25'},
                    {text:'جمعه 26 آبان ',value:'26'},
                  ]
                },
                label:'زمان شرکت در همایش',field:'value.day',
                validations:[['required']]
              },
            ]
          }}
        />
      )
    }
  }
  function submit(){
    setInterCode(true)
  }
  function onClose(){
    if(interCode){setInterCode(false)}
    else{props.onClose()}
  }
  function codeLabel_layout(){
    return {
      flex:1,className:'code-description',
      align:'vh',html:'کد تائید 5 رقمی به شماره موبایل شما ارسال شد'
    }
  }
  function code_layout(){
    return {
      column:[
        {className:'code-label',html:'کد دریافت شده را وارد نمائید'},
        {
          className:'code-input',
          html:(
            <AIOInput
              type='text'
              justNumber={true}
              maxLength={4}
              value={code}
              onChange={(code)=>setCode(code)}
            />
          )
        }
      ]
    }
  }
  function codeSubmit_layout(){
    return {
      flex:1,className:'code-submit',
      column:[
        {flex:1},
        {
          html:(
            <button className='button-2'>ثبت نام</button>
          )
        }
      ]
    }
  }
  let [model,setModel] = useState({
    fisrtname:'',
    lastname:'',
    mobile:'',
    nationalCode:'',
    province:'',
    address:'',
    day:''

  });
  
  return (
    <RVD
      layout={{
        className: 'fs-24 container',style:{background:'#fff'},
        column: [
          header_layout(),
          {
            show:!interCode,
            flex: 1, className: 'ofy-auto main',
            column: [
              billboard_layout(),
              label_layout(),
              form_layout(model)
            ]
          },
          {
            show:!!interCode,
            flex: 1, className: 'ofy-auto main p-24',
            column: [
              codeLabel_layout(),
              code_layout(),
              codeSubmit_layout()
            ]
          },
        ]
      }}
    />
  );
}