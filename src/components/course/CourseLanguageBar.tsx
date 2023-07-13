const CourseLanguageBar = () => {
  return (
    <div className="sticky top-0 sm:top-11 w-full h-11 bg-primary500 text-white pr-2">
      <div className="h-full container">
        <select
          name="course"
          id="course"
          className="bg-primary500 p-2 outline-none"
        >
          <option value="Spanish" className="p-4">
            Spanish
          </option>
          <option value="English">English</option>
        </select>
      </div>
    </div>
  );
};

export default CourseLanguageBar;
