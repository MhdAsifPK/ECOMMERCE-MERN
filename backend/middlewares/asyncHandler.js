function asyncHandler(fn){
    return (req,res,next)=>{
        // fn  is cntrollwer function
// fn n ullul ullath error handler cheyyunnadatth ulla try catch ne aan store aakkanath
        Promise.resolve(fn(req,res,next)).then(()=>{
            next();
        })
        .catch(next);
    }
}

export default asyncHandler