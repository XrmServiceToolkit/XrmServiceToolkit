import {Gulpclass, Task, SequenceTask} from "gulpclass/Decorators";
import * as gulp from "gulp";
import * as del from "del";

@Gulpclass()
export class Gulpfile {

    @Task()
    clean(cb: Function) {
        return del(["./dist/**"], cb);
    }

    @Task()
    copyFiles() {
        return gulp.src(["./README.md"])
            .pipe(gulp.dest("./dist"));
    }

    @Task("copy-source-files") // you can specify custom task name if you need
    copySourceFiles() {
        return gulp.src(["./src/**.js"])
            .pipe(gulp.dest("./dist/src"));
    }

    @SequenceTask() // this special annotation using "run-sequence" module to run returned tasks in sequence
    build() {
        return ["copyFiles", "copy-source-files"];
    }

    @Task()
    default() { // because this task has "default" name it will be run as default gulp task
        return ["build"];
    }
}