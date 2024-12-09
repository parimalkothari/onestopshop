class ApiError extends Error {
  constructor(
    message = "Something went wrong",
    statusCode,
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


export default ApiError