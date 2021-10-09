module.exports={
    secret:process.env.AUTH_SECRET || "catenacio21",
    expires:process.env.AUTH_EXPIRES ||  "7d",
    rounds:process.env.AUTH_ROUNDS || 10
}