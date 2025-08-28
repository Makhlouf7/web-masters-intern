class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    // 1A) FILTERING
    const queryObj = { ...this.queryObj };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replaceAll(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    this.query.find(JSON.parse(queryStr));
    // Allow chaining methods
    return this;
  }

  sort() {
    if (this.queryObj.sort) {
      let sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
      // sort based on the price if a tie sort based on ratingsAverage
      // sort("price ratingsAverage")
    } else {
      this.query = this.query.sort("-createdAt");
    }
    // Allow chaining methods
    return this;
  }

  limitFields() {
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(",").join(" ");
      this.query = this.query.select(fields);
      // Give the wanted fields separated by spaces
      // query = query.select('name duration price');
    } else {
      this.query = this.query.select("-__v");
    }
    // Allow chaining methods
    return this;
  }

  paginate() {
    // 4) Pagination
    const page = +this.queryObj.page || 1;
    const limit = +this.queryObj.limit || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    // Allow chaining methods
    return this;
  }
}

module.exports = APIFeatures;
