
$(function() {
    var getModel = window.location.search.split("&").filter(function(data, index){
        var data = data.replace("?","");
        return data == "model=userSetup";
    });

    var isLoadingDone = function () {
        return $("#jg-overlay").css("display") == "none" ? true : false;
    }
    
    var modelUserSetup = function(){
        setTimeout(function(){
            if(isLoadingDone()){
                var isModelUserSetup = (getModel.length > 0 || $("input[name='model']").val() == "userSetup" );
    
                if(isModelUserSetup){
                    
                    console.log("Execute model user setup");
                    $(".bm-actionstrip").attr("style", "background-color:#0C727A!important;");

                    $(".jg-box-toolbar").hide();
                    $("a[name='start_over']").closest("table").hide();
                    $("a[name='create_transaction']").closest("table").hide();
                    $("a[name='add_to_favourites']").closest("table").hide();
                    $("a[name='update']").text("Validate")
                                        .closest(".button-middle").attr("style", "border-radius: 100px !important;border: solid 2px #fff;background: #0C727A;    padding: 5px 15px;margin-right: 30px;")
                                        .closest("table").css({ "margin-top": "12px", "background": "#0C727A" });
                    $(".tab-content").css("padding", "20px 10px")
                
                }
            }else{
                modelUserSetup();
            }
        }, 200);
    }

    modelUserSetup();

});
