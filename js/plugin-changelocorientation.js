//DEFINE PLUGIN//
var jsPsychchangelocorientation= (function (jspsych) {
    'use strict';
  
    //SET PATARAMETERS//
    const info = {
      name: "changelocorientationPlugin",
      parameters: {
        fixation_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: 'Fixation duration',
          default: 1000,
          description: 'How long to show the fixation before stimulus presentation.'
        },
        colors: {
          type: jspsych.ParameterType.STRING,
          default: ["#c9281c","#f0e10c","#158009","#062a9e", "#00FFFF","#FF00FF","#000000","#FFFFFF"],
        },
        n_colors: {
          type: jspsych.ParameterType.INT,
          default: 6
        },
        orientations: {
          type: jspsych.ParameterType.STRING,
          default: ["0.png","45.png","90.png","135.png","180.png","225.png","270.png","315.png"],
          },
        n_orientations: {
          type: jspsych.ParameterType.INT,
          default: 4
        },
        stim_duration: {
          type: jspsych.ParameterType.INT,
          default: 250
        },
        orien_colorchange: {
          type: jspsych.ParameterType.STRING,
          default: null
        },
      },
    };
  
    /**
     *
     * **plugin-changelocorientation**
     * @author Temilade Adekoya
     * @Author Darius Suplica
     * 
     * display stimuli simultaneously
     * then test on change with all stimuli simultaneously displayed
     *
     *
     **/
  
    class changelocorientationPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      // this matters (below)
      trial(display_element, trial) {
        var test_index; // index of item to be changed
        var test_item; // new value for changed item
        var response_array = [1,2,3,4,];
        var canvasSize = 600;
        // Main experiment code starts now
  
         //CREATE CANVAS OBJECT//
         display_element.innerHTML = "<div id='jspsych-changeloc-plugin' style='position: relative; width:" + canvasSize + "px; height:" + canvasSize + "px'></div>";
         display_element.querySelector("#jspsych-changeloc-plugin").innerHTML += "<canvas id='c', width = '" + canvasSize + "', height = '" + canvasSize + "'/canvas>";
        
         //CREATE FABRIC OBJECT//
         var canvas = new fabric.Canvas('c');
         canvas.set({
           renderOnAddRemove: false,
           selection: false,
           backgroundColor: '#9E9E9E'
         });
  
         function show_fixation() {
          //SHOW FIXATION CROSS//
          var fixation = new fabric.Text('+', {
            id: 'fixation',
            fill: '#FFFFFF',
            fontSize: 30,
            hasBorders: false,
            hasControls: false,
            hoverCursor: 'default',
            lockMovementX: true,
            lockMovementY: true
          });
          canvas.add(fixation);
          fixation.center();
          canvas.requestRenderAll();
        }
  
        //CREATE POSITION ARRAY AND SHUFFLE IT//
        var position_array = [[100,100],[100,400],[400,100],[400,400]]
  
        function shuffleArray(array) { // shuffle array, NOT IN PLACE
          var new_array = [].concat(array);
          for (var i = new_array.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = new_array[i];
              new_array[i] = new_array[j];
              new_array[j] = temp;
          }
          return new_array;
        }
  
        function getRandomInt(max) { // random int from 0 (inclusive) to max (exclusive)
          return Math.floor(Math.random() * max);
        }
  
        position_array = shuffleArray(position_array)
        
        //CREATE ARRAY OF EMPTY ARRAY OF STIMULI//
        //SHUFFLE ARRAYS IN SHAPE AND COLOR PARAMTERS & ASSIGN THE SHUFFLES TO VARIABLES//
        var stimulus_array = [];
        var n_colorshuffle = shuffleArray(trial.colors)
        var n_orientationshuffle = shuffleArray(trial.orientations)
        console.log(n_orientationshuffle)
  
        //PUSH COLORS TO EMPTY STIMULUS ARRAY//
        for (var i =0; i<trial.n_colors; i++){
          stimulus_array.push({stimulus: n_colorshuffle[i], type: "color"});
        }
        for (var i = 0; i<trial.n_orientations; i++){
          stimulus_array.push({stimulus: n_orientationshuffle[i], type: "orientation"});
        }
        console.log(trial.n_orientations)
        console.log(trial.n_colors)
  
        //SHUFFLE STIMULUS ARRAY//
        stimulus_array = shuffleArray(stimulus_array);
        console.log(stimulus_array)
  
        //BUILD OUT DISPLAY//
        const draw_stim = (stimulus,pos,label)=> {
          var pattern = /^#/;
          var is_color = pattern.test(stimulus) //SEARCH FOR '#' IN STIMULUS ARGUMENT TO CONFIRM STIMULUS IS A COLOR//
          return new Promise(async (resolve, reject) => {
            if (is_color){ 
              var rect = new fabric.Rect({
                width: 100,
                height: 100,
                left: pos[0],
                top: pos[1],
                fill: stimulus,
                hasBorders: false,
                hasControls: false,
                hoverCursor: 'default',
                lockMovementX: true,
                lockMovementY: true
              });  
              canvas.add(rect);
              resolve();
              if (label) {
                //ADD NUMBER LABEL//
                var label_object = new fabric.Text(label.toString(), {
                  originY: "bottom",
                  left: pos[0],
                  top: pos[1],
                  fill: '#FFFFFF',
                  fontSize: 30,
                  hasBorders: false,
                  hasControls: false,
                  hoverCursor: 'default',
                  lockMovementX: true,
                  lockMovementY: true
                });
                canvas.add(label_object);
                canvas.requestRenderAll();
                resolve();
              }
            } else { //'DRAW' ORIENTATION//
              fabric.Image.fromURL(stimulus,function(o){
                o.set({
                  width: 100,
                  height: 100,
                  left: pos[0],
                  top: pos[1],
                  hasBorders: false,
                  hasControls: false,
                  hoverCursor: 'default',
                  lockMovementX: true,
                  lockMovementY: true
                })
                canvas.add(o);
                var endDraw = Date.now();
                resolve();
              })
              if (label) {
                //ADD NUMBER LABEL//
                var label_object = new fabric.Text(label.toString(), {
                  originY: "bottom",
                  left: pos[0],
                  top: pos[1],
                  fill: '#FFFFFF',
                  fontSize: 30,
                  hasBorders: false,
                  hasControls: false,
                  hoverCursor: 'default',
                  lockMovementX: true,
                  lockMovementY: true
                });
                canvas.add(label_object);
                canvas.requestRenderAll();
              }
            }
          })
        }
        //BUILD OUT TEST DISPLAY//
        const test_procedure = async ()=> {
          //CREATE ARRAY OF DESIRED RESPONSES & SHUFFLE//
          response_array = shuffleArray(response_array);
          //ASSIGN RANDOM INTEGERS TO EACH STIMULUS WITHIN PRODUCED ARRAY//
          test_index = getRandomInt(stimulus_array.length);
          while (true) { //INDEX ONE STIMULUS (USING TEST_INDEX) WITHIN STIMULUS ARRAY AND COMPARE ITS TYPE TO ORIENTATIONOR COLOR PARAMETER STRING//
            console.log(stimulus_array)
            if (stimulus_array[test_index].type === trial.orien_colorchange) {
              break; //IF ABOVE MATCH, BREAK OUT OF WHILE LOOP//
            } else { //IF THE ABOVE DON'T MATCH, INDEX ANOTHER STIMULUS AND COMPARE AGAIN// 
              test_index = getRandomInt(stimulus_array.length);
            }
          }
  
          for (var i = 0; i < stimulus_array.length; i++){
            if (i === test_index) {
              if (trial.orien_colorchange === "color") {
                test_item = n_colorshuffle[5]; 
              } else {
                test_item = n_orientationshuffle[5];
              }
              //CHANGE THE INDEXED STIMULUS TO DESIGNATED TEST ITEM GIVEN IF STATEMENT//
              const changed = await draw_stim(test_item,position_array[i], response_array[i]);
            } else { //LEAVE ALL OTHER OBJECTS NOT CHOSEN BY TEST INDEX THE SAME AS IN SAMPLE DISPLAY//
              const stimulus = await draw_stim(stimulus_array[i].stimulus,position_array[i], response_array[i])
            }
            canvas.requestRenderAll();
          }

          // event listener
          var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
            callback_function: afterResponse,
            valid_responses: ['1','2','3','4'],
            rt_method: 'performance',
            persist: false,
            allow_held_key: false
          });
        };
        const do_the_drawing = async () => {
          var i = 0;
          while (i < stimulus_array.length){
            const stimulus = await draw_stim(stimulus_array[i].stimulus,position_array[i]);
            i++;
          }
          canvas.requestRenderAll();
          this.jsPsych.pluginAPI.setTimeout(function() { //STIMULUS DURATION//
            canvas.getObjects().forEach(o => {
                if (!o.id) {
                    canvas.remove(o);
                }
            });
            canvas.requestRenderAll();
            this.jsPsych.pluginAPI.setTimeout(function() {
              test_procedure();
            }, 1000);
          }, 250);
        }
        show_fixation();
        this.jsPsych.pluginAPI.setTimeout(function() { //INTERTRIAL INTERVAL//
          do_the_drawing();
        }, 1000);
  
        function afterResponse(info){
          end_trial(info.key, info.rt)
        }
  
        // FINISH
        const end_trial = (key, rt) => {
          // remove event listeners
          $(document).unbind();
    
          // data saving
          var trial_data = {
            "key": key,
            "rt": rt,
            "stimuli": stimulus_array,
            "positions": position_array,
            "test_index": test_index,
            "test_item": test_item,
            "n_colors": trial.n_colors,
            "n_orientations": trial.n_orientations,
            "orien_colorchange": trial.orien_colorchange,
            "correct_answer": response_array,
          };
          console.log(trial_data)
    
          // go to next trial
          this.jsPsych.finishTrial(trial_data);
        }
      }
    }
    changelocorientationPlugin.info = info;
  
    //RETURN PLUGIN OBJECT//
    return changelocorientationPlugin;
  
  })(jsPsychModule);