
module.exports = MyUI;

window.projects = require("../param/projects");

function MyUI(params){
}

MyUI.prototype = {
    initcontrol: function(){
        var myobj = this;

        $(".project_icon").css("height", $(".project_icon").css("width"));

        $( window ).resize(function() {
            $(".project_icon").css("height", $(".project_icon").css("width"));
        });

        d3.selectAll(".project_icon").on("mouseover",function(){
            d3.select(this).select(".project_info").style("opacity","1");
            d3.select(this).select(".project_cover").style("opacity","1");

        }).on("mouseout",function(){
            d3.select(this).select(".project_info").style("opacity","0");
            d3.select(this).select(".project_cover").style("opacity","0");

        }).on("click",function(){

            var project_id = d3.select(this).attr("id").split("_")[1];

            var project_mount = d3.select("body").append("div");

            project_mount.attr("class","project_mount")
            .style("opacity",0)
            .transition()
            .style("opacity",1)
            .duration(600)
            .each("end",function(){
                d3.selectAll(".project_icon").transition().duration(150).each("end",function(){
                    d3.select(this).style("display","none");
                })

                project_mount.append("div").attr("class","mount_go_back")
                    .append("p")
                    .text("Go Back").on("click",function(){
                        d3.selectAll(".project_icon").style("display","block");
                        project_mount.remove();

                    });


                /////////////////////////////////////////////////////////
                //start to add info for each project;
                console.log(project_id);

                console.log(window.projects[project_id]);
                var mount_window = project_mount.append("div").attr("class","mount_window");

                myobj.project_app({
                    obj:mount_window,
                    projectid:project_id
                });

            });
        });

    },

    project_app: function(e){
        var mysrc = "";

        if(e.projectid == 1)
            mysrc = "../Student%20Websites/P01_pedestrianvscar/";
        else if(e.projectid == 2)
            mysrc = "../Student%20Websites/P02_womenonthemove/viz.html";
        else if(e.projectid == 3)
            mysrc = "../Student%20Websites/P03_RiyadhGo/RiyadhGo/viz.html";
        else if(e.projectid == 4)
            mysrc = "../Student%20Websites/P04_Migrant%20Population/riyadh-project/";
        else if(e.projectid == 5)
            mysrc = "../Student%20Websites/P05_Riyadh_together/viz.html";
        else if(e.projectid == 6)
            mysrc = "../Student%20Websites/P06_voicesofriyadh/viz.html";
        
        e.obj.append("iframe").attr("src",mysrc)
            .attr("height","100%")
            .attr("width","100%");
    }

}