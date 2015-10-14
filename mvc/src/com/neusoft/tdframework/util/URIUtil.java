package com.neusoft.tdframework.util;

import java.io.File;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.regex.Pattern;

public class URIUtil {
	
	public static final Pattern WINDOWS_DIRECTORY_SEPARATOR = Pattern.compile("\\\\+");
	public static final Charset UTF_8 = Charset.forName("UTF-8");
	
    public static URI getConfigURI(final String location) {
        try {
            String configLocation = location;
           
            if (configLocation != null) {
                final URL url = URIUtil.class.getResource(configLocation);
                if (url != null) {
                    return url.toURI();
                }
            }
        } catch (final Exception ex) {
        	ex.printStackTrace();
        }
        if (location != null) {
            try {
                return getCorrectedFilePathUri(location);
            } catch (final Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
	
    public static URI getCorrectedFilePathUri(final String uri) throws URISyntaxException {
        return new URI(WINDOWS_DIRECTORY_SEPARATOR.matcher(uri).replaceAll("/"));
    }
    
    
    public static boolean isClassLoaderUri(final URI uri) {
        if (uri == null) {
            return false;
        }
        final String scheme = uri.getScheme();
        return scheme == null || scheme.equals("classloader") || scheme.equals("classpath");
    }
    
    public static String extractClassLoaderUriPath(final URI uri) {
        return uri.getScheme() == null ? uri.getPath() : uri.getSchemeSpecificPart();
    }

    
    
    public static File fileFromUri(URI uri) {
        // There MUST be a better way to do this. TODO Search other ASL projects...
        if (uri == null
                || (uri.getScheme() != null && (!"file".equals(uri.getScheme()) && !"vfsfile".equals(uri
                        .getScheme())))) {
            return null;
        }
        if (uri.getScheme() == null) {
            File file = new File(uri.toString());
            if (file.exists()) {
                return file;
            }
            try {
                final String path = uri.getPath();
                file = new File(path);
                if (file.exists()) {
                    return file;
                }
                uri = new File(path).toURI();
            } catch (final Exception ex) {
            	ex.printStackTrace();
                return null;
            }
        }
        final String charsetName = UTF_8.name();
        try {
            String fileName = uri.toURL().getFile();
            if (new File(fileName).exists()) { // LOG4J2-466
                return new File(fileName); // allow files with '+' char in name
            }
            fileName = URLDecoder.decode(fileName, charsetName);
            return new File(fileName);
        } catch (final MalformedURLException ex) {
        	ex.printStackTrace();
        } catch (final UnsupportedEncodingException uee) {
        	uee.printStackTrace();
        }
        return null;
    }
}
