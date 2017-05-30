import com.coveo.nashorn_modules.Folder;
import com.coveo.nashorn_modules.Require;
import com.coveo.nashorn_modules.ResourceFolder;
import jdk.nashorn.api.scripting.NashornScriptEngine;
import jdk.nashorn.api.scripting.NashornScriptEngineFactory;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.objects.Global;
import jdk.nashorn.internal.objects.NativeObject;
import jdk.nashorn.internal.runtime.Context;
import jdk.nashorn.internal.runtime.ScriptObject;
import lib.icedust.JavascriptConsole;

import javax.script.*;
import java.net.URISyntaxException;

public class NashornRunner {
    public static ThreadLocal<ScriptEngine> engineHolder = ThreadLocal.withInitial(() -> {
        NashornScriptEngine engine = (NashornScriptEngine) new javax.script.ScriptEngineManager().getEngineByName("nashorn");
        Folder rootFolder = ResourceFolder.create(NashornRunner.class.getClassLoader(), "lib-js", "UTF-8");
        try {
            Require.enable(engine, rootFolder);
        } catch (ScriptException e) {
            e.printStackTrace();
        }
//        JavascriptConsole.createConsole(engine);

        createProcess(engine);
        loadPolyfill(engine);
        return engine;
    });

    public static void main(String[] args) throws URISyntaxException, ScriptException {
        new NashornRunner().run();
    }

    public static void createProcess(ScriptEngine engine){
        Bindings process = engine.createBindings();
        Bindings env = engine.createBindings();
        env.put("NODE_ENV", "development");
        process.put("env", env);
        engine.put("process", process);
    }

    public static void loadPolyfill(ScriptEngine engine){
        try {
            engine.eval("require('./lib/nashorn-polyfill');");
        } catch (ScriptException e) {
            e.printStackTrace();
        }
    }

    public void run(){
        try {
            String script = "require('./test')";
            Object result = engineHolder.get().eval(script);
            System.out.println(result);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
