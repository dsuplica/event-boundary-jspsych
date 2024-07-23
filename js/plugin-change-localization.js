//DEFINE PLUGIN//
var jsPsychChangeLocalization= (function (jspsych) {
    'use strict';
  
    //SET PATARAMETERS//
    const info = {
      name: "change-localization",
      parameters: {
        fixation_duration: {
          type: jspsych.ParameterType.INT,
          pretty_name: 'Fixation duration',
          default: 1000,
          description: 'How long to show the fixation before stimulus presentation.'
        },
        colors: {
          type: jspsych.ParameterType.STRING,
          default: ["#af0000","#ffff00","#0000ff","#6b460d","#008c00","#ff00ff","#ff1200","#ffcc00", "#0b0b84","#b77104","#03d403","#b205b2"],
        },
        n_colors: {
          type: jspsych.ParameterType.INT,
          default: 0
        },
        shapes: {
          type: jspsych.ParameterType.STRING,
          default: ['circle_black.png', 'cog_black.png', 'crescent_black.png', 'horizontal_black.png', 'square_black.png', 'triangle_black.png', 'vertical_black.png', 'x_black.png','circle_alt.png', 'cog_alt.png', 'crescent_alt.png', 'horizontal_alt.png', 'square_alt.png', 'triangle_alt.png', 'vertical_alt.png', 'x_alt.png'],
          },
        n_shapes: {
          type: jspsych.ParameterType.INT,
          default: 0
        },
        stim_duration: {
          type: jspsych.ParameterType.INT,
          default: 250
        },
        shape_colorchange: {
          type: jspsych.ParameterType.STRING,
          default: null
        },
        test_index: { // index of item to be changed
          type: jspsych.ParameterType.INT,
          default: null
        },
        test_item: { // new value for changed item
          type: jspsych.ParameterType.STRING,
          default: null
        }
      },
    };
  
    /**
     *
     * **change-localization**
     * @author Temilade Adekoya
     *
     * 
     * display stimuli simultaneously
     * test on single change
     * 
     *
     **/
  
    class ChangeLocalizationPlugin {
      constructor(jsPsych) {
        this.jsPsych = jsPsych;
      }
  
      // this matters (below)
      trial(display_element, trial) {
        var canvasSize = 600;
        // Main experiment code starts now
  
         //CREATE CANVAS OBJECT//
         display_element.innerHTML = "<div id='jspsych-change-localization-plugin' style='position: relative; width:" + canvasSize + "px; height:" + canvasSize + "px'></div>";
         display_element.querySelector("#jspsych-change-localization-plugin").innerHTML += "<canvas id='c', width = '" + canvasSize + "', height = '" + canvasSize + "'/canvas>";
        
         //CREATE FABRIC OBJECT//
         var canvas = new fabric.Canvas('c');
         canvas.set({
           renderOnAddRemove: false,
           selection: false,
           backgroundColor: '#FFFFFF'
         });
  
         function show_fixation() {
          //SHOW FIXATION CROSS//
          var fixation = new fabric.Text('+', {
            id: 'fixation',
            fill: '#000000',
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
        var position_array = [[100,100],[400,100],[100,400],[400,400]]
  
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
        
        var shuffled_position_array = shuffleArray(position_array)
        
        //CREATE ARRAY OF EMPTY ARRAY OF STIMULI//
        //SHUFFLE ARRAYS IN SHAPE AND COLOR PARAMTERS & ASSIGN THE SHUFFLES TO VARIABLES//
        var stimulus_array = [];
        // var n_colorshuffle = shuffleArray(trial.colors)
        // var n_shapeshuffle = shuffleArray(trial.shapes)
        // console.log(n_shapeshuffle)
  
        //PUSH COLORS TO EMPTY STIMULUS ARRAY//
        // for (var i =0; i<trial.n_colors; i++){
        //   stimulus_array.push({stimulus: n_colorshuffle[i], type: "color"});
        // }
        // for (var i = 0; i<trial.n_shapes; i++){
        //   stimulus_array.push({stimulus: n_shapeshuffle[i], type: "shape"});
        // }
        for (var i =0; i<trial.n_colors; i++){
          stimulus_array.push({stimulus: trial.colors[i], type: "color"});
        }
        for (var i = 0; i<trial.n_shapes; i++){
          stimulus_array.push({stimulus: trial.shapes[i], type: "shape"});
        }

        // console.log(trial.n_shapes)
        // console.log(trial.n_colors)
  
        //SHUFFLE STIMULUS ARRAY//
        // stimulus_array = shuffleArray(stimulus_array);
        console.log(stimulus_array)
  
        //BUILD OUT DISPLAY//
        const draw_stim = (stimulus,pos)=> {
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
            } else { //'DRAW' SHAPE//
              fabric.Image.fromURL(stimulus,function(o){
                o.set({
                  left: pos[0],
                  top: pos[1],
                  hasBorders: false,
                  hasControls: false,
                  hoverCursor: 'default',
                  lockMovementX: true,
                  lockMovementY: true
                })
                o.scaleToWidth(100);
                o.scaleToHeight(100);
                canvas.add(o);
                var endDraw = Date.now();
                resolve();
              })
            }
          })
        }
        //BUILD OUT TEST DISPLAY//
        const test_procedure = async ()=> {
          //ASSIGN RANDOM INTEGERS TO EACH STIMULUS WITHIN PRODUCED ARRAY//
          // if (!trial.test_index) {
          //   trial.test_index = getRandomInt(stimulus_array.length);
          // };
          // while (true) { //INDEX ONE STIMULUS (USING TEST_INDEX) WITHIN STIMULUS ARRAY AND COMPARE ITS TYPE TO SHAPE OR COLOR PARAMETER STRING//
          //   console.log(stimulus_array)
          //   if (stimulus_array[trial.test_index].type === trial.shape_colorchange) {
          //     break; //IF ABOVE MATCH, BREAK OUT OF WHILE LOOP//
          //   } else { //IF THE ABOVE DON'T MATCH, INDEX ANOTHER STIMULUS AND COMPARE AGAIN// 
          //     trial.test_index = getRandomInt(stimulus_array.length);
          //   }
          // }
  
          for (var i = 0; i < stimulus_array.length; i++){
            if (i === trial.test_index) {
              // if (trial.shape_colorchange === "color") {
              //   trial.test_item = n_colorshuffle[5]; 
              // } else {
              //   trial.test_item = n_shapeshuffle[5];
              // }
              //CHANGE THE INDEXED STIMULUS TO DESIGNATED TEST ITEM GIVEN IF STATEMENT//
              const changed = await draw_stim(trial.test_item,shuffled_position_array[i]);
              console.log(trial.test_item)
            } else { //LEAVE ALL OTHER OBJECTS NOT CHOSEN BY TEST INDEX THE SAME AS IN SAMPLE DISPLAY//
              const stimulus = await draw_stim(stimulus_array[i].stimulus,shuffled_position_array[i])
            }
            //ADD NUMBER LABEL//
            var label_object = new fabric.Text((i + 1).toString(), {
              originY: "bottom",
              left: position_array[i][0],
              top: position_array[i][1],
              fill: '#000000',
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
            const stimulus = await draw_stim(stimulus_array[i].stimulus,shuffled_position_array[i]);
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
          }, 500);
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
          console.log(trial.test_index)
    
          // data saving
          var trial_data = {
            "key": key,
            "rt": rt,
            "stimuli": stimulus_array,
            "positions": shuffled_position_array,
            "test_index": trial.test_index,
            "test_item_before": stimulus_array[trial.test_index].stimulus,
            "test_item_after": trial.test_item,
            "n_colors": trial.n_colors,
            "n_shapes": trial.n_shapes,
            "shape_colorchange": trial.shape_colorchange,
            "correct_answer": position_array.indexOf(shuffled_position_array[trial.test_index]) + 1,
          };
          console.log(trial_data)
    
          // go to next trial
          this.jsPsych.finishTrial(trial_data);
        }
      }
    }
    ChangeLocalizationPlugin.info = info;
  
    //RETURN PLUGIN OBJECT//
    return ChangeLocalizationPlugin;
  
  })(jsPsychModule);