# anywhere_fitness_backend


This would eventually be the main documentaion for this back end


Reset heroku db 


On your terminal:
-heroku pg:psql -a anywherefitness 
Then:
-TRUNCATE TABLE event, class, "userData","userCredentials";VACUUM FULL;
Ctrl-C twice and then 
-heroku run npm run resetdb -a anywherefitness