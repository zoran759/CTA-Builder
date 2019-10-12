import React, { Component } from "react";
import Preview from "../components/Preview";

class CtaViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      behavior: null,
      layoutName: null,
      isTriggerActive: false,
      display: 'none',
      isActive: true,
    };
  }

  componentDidMount() {

    let cData = JSON.parse(this.b64DecodeUnicode(ctaData));

    window.addEventListener('load', this.onPageLoaded);

    this.setState({ data: cData.data, behavior: cData.behavior, layoutName: cData.layoutName }, () => {

      const { data } = this.state;

      let icons = new FontFace('icomoon', 'url(' + data.folder + 'assets/fonts/icomoon.woff?fa3kex)', { fontFamily: 'icomoon', fontWeight: 'normal', fontStyle: 'normal' });

      if(data.mainButtonIcon || data.triggerButtonIcon ) {
        let pack = new FontFace('pack', 'url(' + data.folder + 'assets/fonts/pack.woff?fa3kex)', { fontFamily: 'pack', fontWeight: 'normal', fontStyle: 'normal' });

        pack.load().then((loadedFace) => {
          document.fonts.add(pack);
        }).catch((error) => {
          console.log(error)
        });
      }

      icons.load().then((loadedFace) => {
        document.fonts.add(icons);
      }).catch((error) => {
        console.log(error)
      });

      this.addStyle("https://fonts.googleapis.com/css?family=" + data.font + ":400,500,700&display=swap");

      document.querySelector(".cta-viewer").style.fontFamily = data.font;

      if (data.font != data.fontA) {
        this.addStyle("https://fonts.googleapis.com/css?family=" + data.fontA + ":400,500,700&display=swap");
      }

      setTimeout(()=>{
        this.setState({isTriggerActive: true})
      }, 2000)
    });

    let active = localStorage.getItem('cta-builder-show');
    let remind = localStorage.getItem('cta-builder-remind');

    if(active == "none") this.setState({isActive:false});

    if(typeof remind == "string") {
      if(Date.now() < (Number(remind)+120000)) this.setState({isActive:false}, ()=>{
        setInterval(() => {
          if(Date.now() > (Number(remind)+120000)) this.setState({isActive:true})
        }, 60000);
      });
    }
    
  }

  onPageLoaded = () => {
    this.setState({display:'block'});
  }

  b64DecodeUnicode = (str) => {
    return decodeURIComponent(atob(str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }

  b64EncodeUnicode = (str) => {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode('0x' + p1);
      }));
  }

  addStyle = (url) => {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');

    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
  }

  onRemindLater = () => {
    localStorage.setItem('cta-builder-remind', Date.now());
    this.setState({isActive:false});
    let remind = localStorage.getItem('cta-builder-remind');

    setInterval(() => {
      if(Date.now() > (Number(remind)+120000)) this.setState({isActive:true})
    }, 60000);
  }

  onDontShow = () => {
    localStorage.setItem('cta-builder-show', "none");
    this.setState({isActive:false});
  }

  render() {
    const { data, behavior, layoutName, isTriggerActive, display, isActive  } = this.state;

    return (
      data ?
        <div className="cta-viewer" style={{display:display}}>
          <Preview 
          onRemindLater={this.onRemindLater}
          onDontShow = {this.onDontShow}
          isDesign={false}
          behavior={behavior}
          isTriggerActive={isTriggerActive}
          isProduction={true}
          layoutName={layoutName}
          tabs={{}}
          onUpdateTabs={() => { }}
          data={data}
          isActive={isActive}
           />
        </div>
        : ''
    );
  }
}

export default CtaViewer;