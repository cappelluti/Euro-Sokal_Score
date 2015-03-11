$(document).on('pageinit','#home' ,function () {    
    $(".output").css({opacity:0});
	$("#home input").change(function(){
        calcola();
    });
});

function calcola(){    
    if ($(".output").css('opacity')==0){
        $(".output").fadeTo("slow",1);
    }    
    var score,eta,splenomegalia,piastrine,blasti,basofili,eosinofili,classe_rischio;    
    score=$("input:radio[name=scelta_score]:checked").val();      
    eta=$("#eta").val();
    splenomegalia=$("#splenomegalia").val();
    piastrine=$("#piastrine").val();
    blasti=$("#blasti").val();
    basofili=$("#basofili").val();
    eosinofili=$("#eosinofili").val();    
    if (score=="sokal") {
        //Sokal score
        $(".euro").fadeOut(500);
        var val_sokal=Math.exp((0.0116*(eta-43.4))+(0.0345*(splenomegalia-7.51))+(0.188*((piastrine/700)*(piastrine/700)-0.563))+(0.0887*(blasti-2.10)));
        val_sokal=(Math.round(val_sokal*10000))/10000;        
        if (val_sokal<0.8) {
            classe_rischio="<span class='verde'>basso</span>";
        } else if ((val_sokal>=0.8)&&(val_sokal<=1.2)) {
            classe_rischio="<span class='arancione'>intermedio</span>";
        } else {
            classe_rischio="<span class='rosso'>alto</span>";
        }        
        txt="<p class='min'>Sokal score: "+val_sokal+"</p>";
        txt=txt+"<p>Classe di rischio: "+classe_rischio+"</p>";
    } else {
        //Euro score
        $(".euro").fadeIn(500);        
        var coefficiente_eta=1;       
        var coefficiente_basofili=1;      
        var coefficiente_piastrine=1;
        if (eta<50) {coefficiente_eta=0;} 
        if (basofili<3) {coefficiente_basofili=0;}  
        if (piastrine<1500) {coefficiente_piastrine=0;}        
        var val_euro=1000*((0.6666*coefficiente_eta)+(0.0420*splenomegalia)+(0.0584*blasti)+(0.0413*eosinofili)+(0.2039*coefficiente_basofili)+(1.0956*coefficiente_piastrine));
        val_euro=(Math.round(val_euro*10))/10;        
        if (val_euro<780) {
            classe_rischio="<span class='verde'>basso</span>";
        } else if ((val_euro>=780)&&(val_euro<=1480)) {
            classe_rischio="<span class='arancione'>intermedio</span>";
        } else {
            classe_rischio="<span class='rosso'>alto</span>";
        }        
        txt="<p class='min'>Euro score: "+val_euro+"</p>";
        txt=txt+"<p>Classe di rischio: "+classe_rischio+"</p>";        
    }
    output("<p>"+txt+"</p>");    
}
function output(testo_output){
    //$(".output").fadeTo("fast",0);
    $(".output").html(testo_output);
    //$(".output").fadeTo("fast",1);
}