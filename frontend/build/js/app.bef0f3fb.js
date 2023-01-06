(function(){"use strict";var e={1104:function(e,t,a){var r=a(9963),n=a(6252);const l={key:0,class:"login-component"},o={key:0,class:"password-container"},s=(0,n._)("h1",{class:"text-center"},"Login",-1),i={class:"text-center"},c={class:"form-group mt-3"},u=(0,n._)("label",{for:"inputLoginname"},"Loginname",-1),d={class:"form-group mt-3"},m=(0,n._)("label",{for:"inputPassword"},"Passwort",-1),g=(0,n._)("br",null,null,-1),p={key:1,class:"password-container"},f={class:"text-center"},_={class:"form-group mt-3"},v=(0,n._)("label",{for:"inputRegisterLoginname"},"Loginname (Damit loggen Sie sich ein)",-1),h={class:"form-group mt-3"},w=(0,n._)("label",{for:"inputRegisterName"},"Vorname",-1),b={class:"form-group mt-3"},k=(0,n._)("label",{for:"inputRegisterLastName"},"Nachname",-1),y={class:"form-group mt-3"},x=(0,n._)("label",{for:"inputRegisterMail"},"Mail",-1),W={class:"form-group mt-3"},P=(0,n._)("label",{for:"inputRegisterMobileNr"},"Telefonnummer",-1),V={class:"form-group mt-3"},U=(0,n._)("label",{for:"inputRegisterPassword"},"Passwort",-1),z={class:"form-group mt-3"},O=(0,n._)("label",{for:"inputRegisterPasswordConfirm"},"Passwort Erneut eingeben",-1),L={key:1};function j(e,t,a,j,C,D){const A=(0,n.up)("router-view"),I=(0,n.up)("navbar");return(0,n.wg)(),(0,n.iD)(n.HY,null,[!1===C.loggedIn?((0,n.wg)(),(0,n.iD)("div",l,[!1===C.register_component?((0,n.wg)(),(0,n.iD)("div",o,[s,(0,n._)("form",i,[(0,n._)("div",c,[u,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"inputLoginname",placeholder:"Loginname...","onUpdate:modelValue":t[0]||(t[0]=e=>C.loginname=e)},null,512),[[r.nr,C.loginname]])]),(0,n._)("div",d,[m,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"inputPassword",placeholder:"Passwort...","onUpdate:modelValue":t[1]||(t[1]=e=>C.password=e)},null,512),[[r.nr,C.password]])]),(0,n._)("button",{type:"submit",class:"btn btn-success mt-3",onClick:t[2]||(t[2]=e=>D.postLogin())},"Login"),g,(0,n._)("button",{type:"submit",class:"btn btn-outline-success mt-3",onClick:t[3]||(t[3]=e=>C.register_component=!0)},"Noch kein Account?")])])):(0,n.kq)("",!0),!0===C.register_component?((0,n.wg)(),(0,n.iD)("div",p,[(0,n._)("form",f,[(0,n._)("div",_,[v,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"inputRegisterLoginname",placeholder:"Loginname...","onUpdate:modelValue":t[4]||(t[4]=e=>C.register_loginname=e)},null,512),[[r.nr,C.register_loginname]])]),(0,n._)("div",h,[w,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"inputRegisterName",placeholder:"Vorname...","onUpdate:modelValue":t[5]||(t[5]=e=>C.register_name=e)},null,512),[[r.nr,C.register_name]])]),(0,n._)("div",b,[k,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"inputRegisterLastName",placeholder:"Nachname...","onUpdate:modelValue":t[6]||(t[6]=e=>C.register_lastname=e)},null,512),[[r.nr,C.register_lastname]])]),(0,n._)("div",y,[x,(0,n.wy)((0,n._)("input",{type:"email",class:"form-control",id:"inputRegisterMail",placeholder:"Mail...","onUpdate:modelValue":t[7]||(t[7]=e=>C.register_mail=e)},null,512),[[r.nr,C.register_mail]])]),(0,n._)("div",W,[P,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"inputRegisterMobileNr",placeholder:"Mail...","onUpdate:modelValue":t[8]||(t[8]=e=>C.register_mobilenr=e)},null,512),[[r.nr,C.register_mobilenr]])]),(0,n._)("div",V,[U,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"inputRegisterPassword",placeholder:"Passwort...","onUpdate:modelValue":t[9]||(t[9]=e=>C.register_password=e)},null,512),[[r.nr,C.register_password]])]),(0,n._)("div",z,[O,(0,n.wy)((0,n._)("input",{type:"password",class:"form-control",id:"inputRegisterPasswordConfirm",placeholder:"Passwort...","onUpdate:modelValue":t[10]||(t[10]=e=>C.register_confirmpassword=e)},null,512),[[r.nr,C.register_confirmpassword]])]),(0,n._)("button",{type:"submit",class:"btn btn-success mt-3",onClick:t[11]||(t[11]=e=>D.register())},"Registrieren")])])):(0,n.kq)("",!0)])):(0,n.kq)("",!0),!0===C.loggedIn?((0,n.wg)(),(0,n.iD)("div",L,[(0,n.Wm)(A)])):(0,n.kq)("",!0),(0,n.Wm)(I)],64)}const C=e=>((0,n.dD)("data-v-88b21da8"),e=e(),(0,n.Cn)(),e),D={class:"navbar"},A=C((()=>(0,n._)("i",{class:"fa-solid fa-house"},null,-1))),I=C((()=>(0,n._)("i",{class:"fa-solid fa-map-location-dot"},null,-1))),M=C((()=>(0,n._)("i",{class:"fa-solid fa-user"},null,-1))),S=C((()=>(0,n._)("i",{class:"fa-solid fa-bars"},null,-1)));function N(e,t){const a=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)("div",D,[(0,n.Wm)(a,{to:"/",class:"nav-item"},{default:(0,n.w5)((()=>[A])),_:1}),(0,n.Wm)(a,{to:"/tracking",class:"nav-item",style:{position:"relative"}},{default:(0,n.w5)((()=>[I])),_:1}),(0,n.Wm)(a,{to:"/profile",class:"nav-item"},{default:(0,n.w5)((()=>[M])),_:1}),(0,n.Wm)(a,{to:"/menu",class:"nav-item"},{default:(0,n.w5)((()=>[S])),_:1})])}var T=a(3744);const R={},q=(0,T.Z)(R,[["render",N],["__scopeId","data-v-88b21da8"]]);var E=q,H={name:"App",components:{Navbar:E},data(){return{loggedIn:!0,loginname:"",password:"",register_component:!1,register_loginname:"",register_password:"",register_confirmpassword:"",register_name:"",register_lastname:"",register_mail:"",register_mobilenr:"",url:"http://localhost:3001/"}},beforeMount(){navigator.onLine?this.checkLogin():this.loggedIn=!0},mounted(){window.addEventListener("online",this.checkLogin)},methods:{register(){event.preventDefault(),""!==this.register_password&&""!==this.register_loginname&&""!==this.register_name&&""!==this.register_lastname&&""!==this.register_mail&&""!==this.register_mobilenr&&(this.register_password===this.register_confirmpassword?this.axios.request({method:"POST",url:this.url+"register",data:{username:this.register_loginname.toString().trim(),password:this.register_password.toString().trim(),name:this.register_name.toString().trim(),lastname:this.register_lastname.toString().trim(),mail:this.register_mail.toString().trim(),phone:this.register_mobilenr.toString().trim()}}).then((e=>{console.log(e.data),409===e.status&&(alert("Loginname bereits verwendet. Nutzen Sie einen anderen"),this.register_loginname="",this.register_password="",this.register_confirmpassword=""),201===e.status&&(this.loginname=this.register_loginname,this.password=this.register_password,this.postLogin(),console.log("Worked"))})).catch((function(e){console.log(e)})):(alert("Passwort stimmt nicht überein."),this.register_password="",this.register_confirmpassword=""))},checkLogin(){this.axios.get(this.url+"login").then((e=>{200===e.status&&(this.loggedIn=!0)})).catch((function(e){console.log(e)}))},postLogin(){event.preventDefault(),this.axios.request({method:"POST",url:this.url+"login",data:{username:this.loginname.toString().trim(),password:this.password.toString().trim()}}).then((e=>{console.log(e.data),401===e.status?alert("Falsche Logindaten"):this.loggedIn=!0})).catch((function(e){console.log(e)}))}}};const Z=(0,T.Z)(H,[["render",j]]);var F=Z,B=a(2201),K=a.p+"img/Header-Image.913b3d31.webp",Y=a.p+"img/semi_androidMyCargonautmdpi.722aa426.png",G=a.p+"img/search-image.9bc20ebc.svg",J=a.p+"img/order-image.8e9dee7e.svg",$=a.p+"img/tracking-image.0350533f.svg",Q=a.p+"img/car-image.3a6cc712.svg";const X=e=>((0,n.dD)("data-v-7710747a"),e=e(),(0,n.Cn)(),e),ee=X((()=>(0,n._)("header",null,[(0,n._)("img",{src:K,class:"header-image"})],-1))),te=X((()=>(0,n._)("h1",{class:"text-center"},"Das Ergebnis wenn DHL und eBay-Kleinanzeigen ein Kind bekommen:",-1))),ae=X((()=>(0,n._)("div",{class:"text-center mb-5"},[(0,n._)("img",{src:Y,class:"img-fluid",width:"200"})],-1))),re={class:"text-center",style:{margin:"0 auto"}},ne={class:"row"},le={class:"col-md-3 col mb-3"},oe={class:"card"},se=X((()=>(0,n._)("img",{class:"card-img-top",src:G,alt:"Card image cap"},null,-1))),ie={class:"card-body"},ce=X((()=>(0,n._)("h5",{class:"card-title"},"Alle Angebote",-1))),ue={class:"col-md-3 col mb-3"},de={class:"card"},me=X((()=>(0,n._)("img",{class:"card-img-top",src:J,alt:"Card image cap"},null,-1))),ge={class:"card-body"},pe=X((()=>(0,n._)("h5",{class:"card-title"},"Ich biete / suche",-1))),fe={class:"col-md-3 col mb-3"},_e={class:"card"},ve=X((()=>(0,n._)("img",{class:"card-img-top",src:$,alt:"Card image cap"},null,-1))),he={class:"card-body"},we=X((()=>(0,n._)("h5",{class:"card-title"},"Wo ist?",-1))),be={class:"col-md-3 col mb-3"},ke={class:"card"},ye=X((()=>(0,n._)("img",{class:"card-img-top",src:Q,alt:"Card image cap"},null,-1))),xe={class:"card-body"},We=X((()=>(0,n._)("h5",{class:"card-title"},"Meine Fahrzeuge",-1)));function Pe(e,t){const a=(0,n.up)("router-link");return(0,n.wg)(),(0,n.iD)(n.HY,null,[ee,(0,n._)("section",null,[te,ae,(0,n._)("div",re,[(0,n._)("div",ne,[(0,n._)("div",le,[(0,n._)("div",oe,[se,(0,n._)("div",ie,[ce,(0,n.Wm)(a,{to:"/offers",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Durchstöbern")])),_:1})])])]),(0,n._)("div",ue,[(0,n._)("div",de,[me,(0,n._)("div",ge,[pe,(0,n.Wm)(a,{to:"/createOffer",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Angebot machen")])),_:1})])])]),(0,n._)("div",fe,[(0,n._)("div",_e,[ve,(0,n._)("div",he,[we,(0,n.Wm)(a,{to:"/tracking",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Tracking")])),_:1})])])]),(0,n._)("div",be,[(0,n._)("div",ke,[ye,(0,n._)("div",xe,[We,(0,n.Wm)(a,{to:"/myVehicels",class:"btn btn-primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Ansehen")])),_:1})])])])])])])],64)}const Ve={},Ue=(0,T.Z)(Ve,[["render",Pe],["__scopeId","data-v-7710747a"]]);var ze=Ue,Oe=a(3577);const Le=e=>((0,n.dD)("data-v-198158e4"),e=e(),(0,n.Cn)(),e),je={class:"row d-flex align-items-center justify-content-center mb-5",style:{"text-align":"center"}},Ce={class:"col-md-6 col-12"},De=["src"],Ae={class:"col-md-6 col-12"},Ie={class:"row mb-5"},Me=Le((()=>(0,n._)("h3",null,"Steckbrief:",-1))),Se={key:0},Ne={key:1},Te={key:2},Re={class:"row mb-5"},qe={class:"col-md-6 col-12"},Ee=Le((()=>(0,n._)("h3",{style:{"text-align":"center"}},"Über mich",-1))),He={class:"user-description-box d-flex align-items-center justify-content-center"},Ze={class:"col-md-6 col-12"},Fe=Le((()=>(0,n._)("h3",{style:{"text-align":"center"}},"Meine Fahrzeuge",-1))),Be={class:"car-description-box"},Ke={class:"row d-flex align-items-center justify-content-center"},Ye=["src"],Ge=Le((()=>(0,n._)("br",null,null,-1))),Je=Le((()=>(0,n._)("br",null,null,-1))),$e=Le((()=>(0,n._)("h3",{style:{"text-align":"center"}},"Bewertungen",-1))),Qe={class:"row d-flex align-items-center justify-content-center"},Xe={class:"col-md-3 col-12"},et={key:0},tt=["src"],at={key:1},rt=Le((()=>(0,n._)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541",class:"img-fluid comment-image"},null,-1))),nt=[rt],lt={class:"col-md-9 col-12 commentbox"},ot={style:{color:"rgba(0,0,0,0.5)"}},st=Le((()=>(0,n._)("i",{class:"fa-solid fa-arrow-right"},null,-1))),it={class:"mb-2"};function ct(e,t,a,r,l,o){return(0,n.wg)(),(0,n.iD)("section",null,[(0,n._)("div",je,[(0,n._)("div",Ce,[(0,n._)("h2",null,(0,Oe.zw)(l.user.name)+" "+(0,Oe.zw)(l.user.nachname),1),(0,n._)("img",{src:l.user.profilePicture,class:"profile-picture img-fluid"},null,8,De)]),(0,n._)("div",Ae,[(0,n._)("h3",null,"Bewertung: "+(0,Oe.zw)(l.user.rating)+"/5",1)])]),(0,n._)("div",Ie,[Me,(0,n._)("p",null,"Handynummer: "+(0,Oe.zw)(l.user.mobilenr),1),l.user.gender?((0,n.wg)(),(0,n.iD)("p",Se,"Geschlecht: "+(0,Oe.zw)(l.user.gender),1)):(0,n.kq)("",!0),l.user.birthdate?((0,n.wg)(),(0,n.iD)("p",Ne,"Geboren: "+(0,Oe.zw)(l.user.birthdate),1)):(0,n.kq)("",!0),l.user.adress?((0,n.wg)(),(0,n.iD)("p",Te,"Adresse: "+(0,Oe.zw)(l.user.adress),1)):(0,n.kq)("",!0)]),(0,n._)("div",Re,[(0,n._)("div",qe,[Ee,(0,n._)("div",He,(0,Oe.zw)(l.user.description),1)]),(0,n._)("div",Ze,[Fe,(0,n._)("div",Be,[(0,n._)("div",Ke,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.cars,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e,class:"col-md-3 col-12 mb-3"},[(0,n._)("div",null,[(0,n._)("img",{src:e.carImage,class:"car-image"},null,8,Ye),Ge,(0,n._)("b",null,(0,Oe.zw)(e.brand)+" "+(0,Oe.zw)(e.model),1),(0,n.Uk)(" Sitze: "+(0,Oe.zw)(e.seats),1),Je,(0,n.Uk)(" Stauraum: "+(0,Oe.zw)(e.storage),1)])])))),128))])])]),(0,n._)("div",null,[$e,((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.comments,(e=>((0,n.wg)(),(0,n.iD)("div",{key:e},[(0,n._)("div",Qe,[(0,n._)("div",Xe,[""!==e.customerImage?((0,n.wg)(),(0,n.iD)("div",et,[(0,n._)("img",{src:e.customerImage,class:"img-fluid comment-image"},null,8,tt)])):(0,n.kq)("",!0),""===e.customerImage?((0,n.wg)(),(0,n.iD)("div",at,nt)):(0,n.kq)("",!0)]),(0,n._)("div",lt,[(0,n._)("p",null,(0,Oe.zw)(e.customerName),1),(0,n._)("p",ot,[(0,n.Uk)((0,Oe.zw)(e.start)+" ",1),st,(0,n.Uk)(" "+(0,Oe.zw)(e.destination),1)]),(0,n._)("p",it,(0,Oe.zw)(e.comment),1),(0,n._)("p",null,(0,Oe.zw)(e.rating)+"/5",1)])])])))),128))])])])}var ut={name:"Profile",created(){document.title="Profil"},mounted(){},beforeMount(){this.getProfileInformation(),this.getCars(),this.getComments()},data(){return{url:"http://localhost:3001/",user:{},cars:[],comments:[]}},methods:{getProfileInformation(){this.axios.get(this.url+"profile",{}).then((e=>{this.user=e.data.user}))},getCars(){this.axios.get(this.url+"cars",{}).then((e=>{this.cars=e.data.carList}))},getComments(){this.axios.get(this.url+"comments",{}).then((e=>{this.comments=e.data.commentList,console.log(this.comments)}))}}};const dt=(0,T.Z)(ut,[["render",ct],["__scopeId","data-v-198158e4"]]);var mt=dt;const gt=e=>((0,n.dD)("data-v-53e9caf4"),e=e(),(0,n.Cn)(),e),pt=gt((()=>(0,n._)("h1",null,"Das PACKETNAME ist: STATUS",-1))),ft={class:"pa-6 rounded-circle d-inline-block delivery-icon"},_t=gt((()=>(0,n._)("h2",{class:"mt-6"},"In Bearbeitung",-1))),vt={class:"pa-6 rounded-circle d-inline-block delivery-icon"},ht=gt((()=>(0,n._)("h2",{class:"mt-6"},"Versendet",-1))),wt={class:"pa-6 rounded-circle d-inline-block delivery-icon"},bt=gt((()=>(0,n._)("h2",{class:"mt-6"},"Angekommen",-1))),kt={class:"map-box"};function yt(e,t,a,r,l,o){const s=(0,n.up)("v-select"),i=(0,n.up)("v-card-title"),c=(0,n.up)("v-icon"),u=(0,n.up)("v-col"),d=(0,n.up)("v-row"),m=(0,n.up)("v-card"),g=(0,n.up)("v-container"),p=(0,n.up)("l-tile-layer"),f=(0,n.up)("l-marker"),_=(0,n.up)("l-map");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(g,{class:"mt-16",align:"center"},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{class:"tracking-card",rounded:"4"},{default:(0,n.w5)((()=>[(0,n.Wm)(s,{class:"ma-8",label:"Packet auswählen",items:l.packagesNameList,"v-model":l.selectedPackage,"item-text":e.name,"item-value":e.name},null,8,["items","v-model","item-text","item-value"]),(0,n.Wm)(i,{class:"ma-8"},{default:(0,n.w5)((()=>[pt])),_:1}),(0,n.Wm)(d,{class:"mx-8 my-16"},{default:(0,n.w5)((()=>[(0,n.Wm)(u,{lg:"4",xs:"12"},{default:(0,n.w5)((()=>[(0,n._)("div",ft,[(0,n.Wm)(c,{class:"ma-4",color:"green",size:"100"},{default:(0,n.w5)((()=>[(0,n.Uk)(" fas fa-box ")])),_:1})]),_t])),_:1}),(0,n.Wm)(u,{lg:"4",xs:"12"},{default:(0,n.w5)((()=>[(0,n._)("div",vt,[(0,n.Wm)(c,{class:"ma-4",color:"green",size:"100"},{default:(0,n.w5)((()=>[(0,n.Uk)(" fas fa-truck ")])),_:1})]),ht])),_:1}),(0,n.Wm)(u,{lg:"4",xs:"12"},{default:(0,n.w5)((()=>[(0,n._)("div",wt,[(0,n.Wm)(c,{class:"ma-4",color:"red",size:"100"},{default:(0,n.w5)((()=>[(0,n.Uk)(" fas fa-check ")])),_:1})]),bt])),_:1})])),_:1})])),_:1})])),_:1}),(0,n._)("div",kt,[(0,n.Wm)(_,{ref:"map",zoom:l.zoom,"onUpdate:zoom":t[0]||(t[0]=e=>l.zoom=e),center:l.position,maxZoom:18},{default:(0,n.w5)((()=>[(0,n.Wm)(p,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png","layer-type":"base",name:"OpenStreetMap"}),(0,n.Wm)(f,{"lat-lng":l.position},null,8,["lat-lng"])])),_:1},8,["zoom","center"])])],64)}var xt=a(8662),Wt={name:"Tracking",created(){document.title="Tracking"},components:{LMap:xt.iA,LTileLayer:xt.Hw,LMarker:xt.$R},mounted(){},beforeMount(){this.getPackage()},data(){return{zoom:8,position:[50.52687192341124,8.654176867109685],selectedPackage:"",packagesNameList:[],packagesList:[]}},methods:{getPackage(){const e={name:"Packet 1",status:"0",statusText:"In Bearbeitung"},t={name:"Packet 2",status:"1",statusText:"Versendet"},a={name:"Packet 3",status:"2",statusText:"Zugestellt"};this.packagesList=[e,t,a],this.packagesNameList=[e.name,t.name,a.name]}}};const Pt=(0,T.Z)(Wt,[["render",yt],["__scopeId","data-v-53e9caf4"]]);var Vt=Pt;const Ut=e=>((0,n.dD)("data-v-8487b88e"),e=e(),(0,n.Cn)(),e),zt=Ut((()=>(0,n._)("img",{src:"https://cdn.vuetifyjs.com/images/cards/cooking.png",style:{width:"150px",height:"150px","border-radius":"50%"},class:"ma-4"},null,-1)));function Ot(e,t,a,r,l,o){const s=(0,n.up)("v-col"),i=(0,n.up)("v-btn"),c=(0,n.up)("v-row"),u=(0,n.up)("v-card"),d=(0,n.up)("v-container");return(0,n.wg)(),(0,n.j4)(d,{class:"card-container"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(l.items,(e=>((0,n.wg)(),(0,n.j4)(u,{class:"my-10",rounded:"5",key:e},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{"no-gutters":"",class:"offer-card ma-8",justify:"center",align:"center",style:{"word-break":"break-word"}},{default:(0,n.w5)((()=>[(0,n.Wm)(s),(0,n.Wm)(s,{class:"offer-card-col",cols:"12"},{default:(0,n.w5)((()=>[(0,n._)("h2",null,(0,Oe.zw)(l.exampleOffer.start)+" → "+(0,Oe.zw)(l.exampleOffer.destination),1)])),_:1}),(0,n.Wm)(s,{class:"offer-card-col",cols:"12",md:"4"},{default:(0,n.w5)((()=>[zt,(0,n.Uk)(" Fahrer: "+(0,Oe.zw)(l.exampleOffer.vehicleId),1)])),_:1}),(0,n.Wm)(s,{class:"offer-card-col",cols:"12",md:"3"},{default:(0,n.w5)((()=>[(0,n.Uk)(" Abfahrt am "+(0,Oe.zw)(l.exampleOffer.dateTime),1)])),_:1}),(0,n.Wm)(s,{class:"offer-card-col",cols:"12",md:"2"},{default:(0,n.w5)((()=>[(0,n._)("h4",null,"Preis: "+(0,Oe.zw)(l.exampleOffer.price)+"€",1)])),_:1}),(0,n.Wm)(s,{class:"offer-card-col",cols:"12",md:"3"},{default:(0,n.w5)((()=>[(0,n.Wm)(i,{color:"green",onClick:o.getOffers},{default:(0,n.w5)((()=>[(0,n.Uk)("Angebot annehmen")])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:2},1024)))),128))])),_:1})}var Lt={name:"Offers",created(){document.title="Alle Angebote"},data(){return{url:"http://localhost:3001/",exampleOffer:{vehicleId:1,start:"Frankfurt",destination:"München",dateTime:"2021-05-01T12:00:00.000Z",price:100,description:"Ich fahre von Frankfurt nach München und habe noch Platz im Kofferraum",open:!0},items:[1,2,3,4,5],rides:{}}},beforeMount(){this.getAllRides()},methods:{async getOffers(){console.log("Function called")},getProfileInformation(){this.axios.get(this.url+"profile",{}).then((e=>{this.user=e.data.user}))},getAllRides(){this.axios.get(this.url+"rides",{}).then((e=>{this.rides=e.data.rides,console.log(this.rides)}))}}};const jt=(0,T.Z)(Lt,[["render",Ot],["__scopeId","data-v-8487b88e"]]);var Ct=jt,Dt=a(2262),At={__name:"Login",setup(e){const t=(0,Dt.iH)(""),a=(0,Dt.iH)("");function r(){console.log(t.value),console.log(a.value)}return(e,l)=>{const o=(0,n.up)("v-card-title"),s=(0,n.up)("v-text-field"),i=(0,n.up)("v-col"),c=(0,n.up)("v-row"),u=(0,n.up)("v-container"),d=(0,n.up)("v-form"),m=(0,n.up)("router-link"),g=(0,n.up)("v-card-text"),p=(0,n.up)("v-btn"),f=(0,n.up)("v-card");return(0,n.wg)(),(0,n.j4)(u,{class:"mt-16"},{default:(0,n.w5)((()=>[(0,n.Wm)(f,{class:"login-card",rounded:"4",align:"center"},{default:(0,n.w5)((()=>[(0,n.Wm)(o,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Login")])),_:1}),(0,n.Wm)(d,{class:"login-form",modelValue:e.valid,"onUpdate:modelValue":l[2]||(l[2]=t=>e.valid=t)},{default:(0,n.w5)((()=>[(0,n.Wm)(u,null,{default:(0,n.w5)((()=>[(0,n.Wm)(c,null,{default:(0,n.w5)((()=>[(0,n.Wm)(i,{cols:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(s,{modelValue:t.value,"onUpdate:modelValue":l[0]||(l[0]=e=>t.value=e),label:"E-Mail",type:"email",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(i,{cols:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(s,{modelValue:a.value,"onUpdate:modelValue":l[1]||(l[1]=e=>a.value=e),label:"Passwort",type:"password",required:""},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,n.Wm)(g,{class:"no-account-text mb-16"},{default:(0,n.w5)((()=>[(0,n.Wm)(m,{to:"/register",style:{"text-decoration":"none"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Noch kein Account?")])),_:1})])),_:1}),(0,n.Wm)(p,{class:"mb-8",elevation:"0",variant:"outlined",rounded:"2",onClick:l[3]||(l[3]=e=>r())},{default:(0,n.w5)((()=>[(0,n.Uk)(" Jetzt Einloggen ")])),_:1})])),_:1})])),_:1})}}};const It=(0,T.Z)(At,[["__scopeId","data-v-427277cb"]]);var Mt=It,St=(a(7658),{__name:"Register",setup(e){const t=(0,B.tv)(),a=(0,Dt.iH)(""),r={profilePicture:(0,Dt.iH)(""),firstname:(0,Dt.iH)(""),lastname:(0,Dt.iH)(""),email:(0,Dt.iH)(""),birthday:(0,Dt.iH)(""),password:(0,Dt.iH)("")};function l(){console.log(r),t.push("/login")}return(e,t)=>{const o=(0,n.up)("v-card-title"),s=(0,n.up)("v-file-input"),i=(0,n.up)("v-col"),c=(0,n.up)("v-text-field"),u=(0,n.up)("v-row"),d=(0,n.up)("v-container"),m=(0,n.up)("v-form"),g=(0,n.up)("router-link"),p=(0,n.up)("v-card-text"),f=(0,n.up)("v-btn"),_=(0,n.up)("v-card");return(0,n.wg)(),(0,n.j4)(d,{class:"mt-16"},{default:(0,n.w5)((()=>[(0,n.Wm)(_,{class:"login-card",rounded:"4",align:"center"},{default:(0,n.w5)((()=>[(0,n.Wm)(o,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Registrierung")])),_:1}),(0,n.Wm)(m,{class:"login-form",modelValue:e.valid,"onUpdate:modelValue":t[7]||(t[7]=t=>e.valid=t)},{default:(0,n.w5)((()=>[(0,n.Wm)(d,null,{default:(0,n.w5)((()=>[(0,n.Wm)(u,null,{default:(0,n.w5)((()=>[(0,n.Wm)(i,{cols:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(s,{modelValue:r.profilePicture.value,"onUpdate:modelValue":t[0]||(t[0]=e=>r.profilePicture.value=e),accept:".jpg, .jpeg, .png",label:"Ein Bild von dir!","prepend-icon":"fas fa-camera"},null,8,["modelValue"])])),_:1}),(0,n.Wm)(i,{lg:"6",sm:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{modelValue:r.firstname.value,"onUpdate:modelValue":t[1]||(t[1]=e=>r.firstname.value=e),label:"Vorname",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(i,{lg:"6",sm:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{modelValue:r.lastname.value,"onUpdate:modelValue":t[2]||(t[2]=e=>r.lastname.value=e),label:"Nachname",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(i,{lg:"8",sm:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{modelValue:r.email.value,"onUpdate:modelValue":t[3]||(t[3]=e=>r.email.value=e),label:"E-Mail",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(i,{lg:"4",sm:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{modelValue:r.birthday.value,"onUpdate:modelValue":t[4]||(t[4]=e=>r.birthday.value=e),label:"Geburtsdatum",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(i,{lg:"6",sm:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{modelValue:r.password.value,"onUpdate:modelValue":t[5]||(t[5]=e=>r.password.value=e),label:"Passwort",required:""},null,8,["modelValue"])])),_:1}),(0,n.Wm)(i,{lg:"6",sm:"12"},{default:(0,n.w5)((()=>[(0,n.Wm)(c,{modelValue:a.value,"onUpdate:modelValue":t[6]||(t[6]=e=>a.value=e),label:"Passwort wiederholen",required:""},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1},8,["modelValue"]),(0,n.Wm)(p,{class:"no-account-text mb-16"},{default:(0,n.w5)((()=>[(0,n.Wm)(g,{to:"/login",style:{"text-decoration":"none"}},{default:(0,n.w5)((()=>[(0,n.Uk)("Du hast einen Account?")])),_:1})])),_:1}),(0,n.Wm)(f,{class:"mb-8",elevation:"0",variant:"outlined",rounded:"2",onClick:t[8]||(t[8]=e=>l())},{default:(0,n.w5)((()=>[(0,n.Uk)(" Jetzt Registrieren ")])),_:1})])),_:1})])),_:1})}}});const Nt=(0,T.Z)(St,[["__scopeId","data-v-01cc76b8"]]);var Tt=Nt;const Rt=[{path:"/",component:ze},{path:"/profile",component:mt},{path:"/tracking",component:Vt},{path:"/offers",component:Ct},{path:"/login",component:Mt},{path:"/register",component:Tt}],qt=(0,B.p7)({history:(0,B.PO)(),routes:Rt,linkActiveClass:"active"});var Et=qt,Ht=a(5205);(0,Ht.z)("service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is available; please refresh."),alert("New Version found. Please refresh the App"),window.location.reload(!0)},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var Zt=a(8945),Ft=a(2346),Bt=(a(9773),a(1291)),Kt=a(2931),Yt=a(1251),Gt=a(3009),Jt=a(6300);const $t=(0,Bt.Rd)({components:Gt,directives:Jt,icons:{defaultSet:"fa",aliases:Kt.j,sets:{fa:Kt.fa,mdi:Yt.t}}}),Qt=(0,r.ri)(F);(0,r.ri)(F),Qt.use(Et),Qt.use($t),Qt.use(Ft.Z,Zt.Z),Qt.mount("#app")}},t={};function a(r){var n=t[r];if(void 0!==n)return n.exports;var l=t[r]={id:r,loaded:!1,exports:{}};return e[r].call(l.exports,l,l.exports,a),l.loaded=!0,l.exports}a.m=e,function(){a.amdO={}}(),function(){var e=[];a.O=function(t,r,n,l){if(!r){var o=1/0;for(u=0;u<e.length;u++){r=e[u][0],n=e[u][1],l=e[u][2];for(var s=!0,i=0;i<r.length;i++)(!1&l||o>=l)&&Object.keys(a.O).every((function(e){return a.O[e](r[i])}))?r.splice(i--,1):(s=!1,l<o&&(o=l));if(s){e.splice(u--,1);var c=n();void 0!==c&&(t=c)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[r,n,l]}}(),function(){var e,t=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__};a.t=function(r,n){if(1&n&&(r=this(r)),8&n)return r;if("object"===typeof r&&r){if(4&n&&r.__esModule)return r;if(16&n&&"function"===typeof r.then)return r}var l=Object.create(null);a.r(l);var o={};e=e||[null,t({}),t([]),t(t)];for(var s=2&n&&r;"object"==typeof s&&!~e.indexOf(s);s=t(s))Object.getOwnPropertyNames(s).forEach((function(e){o[e]=function(){return r[e]}}));return o["default"]=function(){return r},a.d(l,o),l}}(),function(){a.d=function(e,t){for(var r in t)a.o(t,r)&&!a.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}}(),function(){a.f={},a.e=function(e){return Promise.all(Object.keys(a.f).reduce((function(t,r){return a.f[r](e,t),t}),[]))}}(),function(){a.u=function(e){return"js/"+e+"."+{93:"23def817",243:"423b802a",431:"6e784723",633:"aac2b928",858:"549e6d85"}[e]+".js"}}(),function(){a.miniCssF=function(e){}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.hmd=function(e){return e=Object.create(e),e.children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:function(){throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e}}(),function(){a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="frontend:";a.l=function(r,n,l,o){if(e[r])e[r].push(n);else{var s,i;if(void 0!==l)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==t+l){s=d;break}}s||(i=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,a.nc&&s.setAttribute("nonce",a.nc),s.setAttribute("data-webpack",t+l),s.src=r),e[r]=[n];var m=function(t,a){s.onerror=s.onload=null,clearTimeout(g);var n=e[r];if(delete e[r],s.parentNode&&s.parentNode.removeChild(s),n&&n.forEach((function(e){return e(a)})),t)return t(a)},g=setTimeout(m.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=m.bind(null,s.onerror),s.onload=m.bind(null,s.onload),i&&document.head.appendChild(s)}}}(),function(){a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){a.p=""}(),function(){var e={143:0};a.f.j=function(t,r){var n=a.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var l=new Promise((function(a,r){n=e[t]=[a,r]}));r.push(n[2]=l);var o=a.p+a.u(t),s=new Error,i=function(r){if(a.o(e,t)&&(n=e[t],0!==n&&(e[t]=void 0),n)){var l=r&&("load"===r.type?"missing":r.type),o=r&&r.target&&r.target.src;s.message="Loading chunk "+t+" failed.\n("+l+": "+o+")",s.name="ChunkLoadError",s.type=l,s.request=o,n[1](s)}};a.l(o,i,"chunk-"+t,t)}},a.O.j=function(t){return 0===e[t]};var t=function(t,r){var n,l,o=r[0],s=r[1],i=r[2],c=0;if(o.some((function(t){return 0!==e[t]}))){for(n in s)a.o(s,n)&&(a.m[n]=s[n]);if(i)var u=i(a)}for(t&&t(r);c<o.length;c++)l=o[c],a.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return a.O(u)},r=self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var r=a.O(void 0,[998],(function(){return a(1104)}));r=a.O(r)})();
//# sourceMappingURL=app.bef0f3fb.js.map