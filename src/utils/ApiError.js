class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.message=message
    this.statusCode=statusCode
    this.data=null
    this.errors=errors
    this.success=false
    if(!stack){
        Error.captureStackTrace(this,this.constructor)
    }
    else{
        this.stack=stack
    }
  }
}


export default ApiError;