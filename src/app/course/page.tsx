// `app/page.tsx` is the UI for the `/` URL
import CourseLanguageBar from "@/components/course/CourseLanguageBar";
import UnitCard from "@/components/course/UnitCard";
const units = [
  { id: "1", title: "Introduction" },
  { id: "2", title: "Foundations" },
  { id: "3", title: "Conversations" },
];

const CoursePage = () => {
  return (
    <div>
      <CourseLanguageBar />
      <div className="container lg:max-w-5xl">
        {units.map((unit) => (
          <UnitCard key={unit.id} id={unit.id} title={unit.title} />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
