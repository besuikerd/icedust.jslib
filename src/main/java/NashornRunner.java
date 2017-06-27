import com.coveo.nashorn_modules.Folder;
import com.coveo.nashorn_modules.Require;
import com.coveo.nashorn_modules.ResourceFolder;
import jdk.nashorn.api.scripting.NashornException;
import jdk.nashorn.api.scripting.NashornScriptEngine;
import jdk.nashorn.api.scripting.NashornScriptEngineFactory;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import jdk.nashorn.internal.objects.Global;
import jdk.nashorn.internal.objects.NativeObject;
import jdk.nashorn.internal.runtime.Context;
import jdk.nashorn.internal.runtime.ScriptObject;

import javax.script.*;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URISyntaxException;
import java.net.URL;

public class NashornRunner {
    public static final ThreadLocal<ScriptEngine> engineHolder = ThreadLocal.withInitial(() -> {
        NashornScriptEngine engine = (NashornScriptEngine) new javax.script.ScriptEngineManager().getEngineByName("nashorn");
        Folder rootFolder = ResourceFolder.create(NashornRunner.class.getClassLoader(), "lib-js", "UTF-8");
        try {
            Require.enable(engine, rootFolder);
        } catch (ScriptException e) {
            e.printStackTrace();
        }
        loadPolyfill(engine);
        loadRuntime(engine);
        return engine;
    });

    public static void main(String[] args) throws URISyntaxException, ScriptException {
        new NashornRunner().run();
    }

    public static void loadPolyfill(ScriptEngine engine){
        URL u = NashornRunner.class.getClassLoader().getResource("icedust.jslib/nashorn-polyfill.js");
        if(u == null){
            System.err.println("Could not find polyfill resource");
        } else{
            try {
                engine.eval(new InputStreamReader(u.openStream()));
            } catch (ScriptException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public static void loadRuntime(ScriptEngine engine){
        URL u = NashornRunner.class.getClassLoader().getResource("icedust.jslib/runtime.js");
        if(u == null){
            System.err.println("Could not find runtime resource");
        } else{
            try {
                engine.eval(new InputStreamReader(u.openStream()));
            } catch (ScriptException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    public void run(){
        try {
            ScriptEngine engine = NashornRunner.engineHolder.get();
            engine.eval("console.log(Runtime.moment().format())");
        } catch(ScriptException e){
          if(e.getCause() instanceof NashornException){
              String trace = NashornException.getScriptStackString(e.getCause());
              System.out.println(trace);
          }
          e.printStackTrace();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
