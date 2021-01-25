# anywhere_fitness_backend


This would eventually be the main documentaion for this back end


Reset heroku db 

heroku pg:psql -a anywherefitness 
TRUNCATE TABLE event, class, "userData","userCredentials";VACUUM FULL;
heroku run npm run resetdb -a anywhereFitness